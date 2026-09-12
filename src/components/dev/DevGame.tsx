import { Volume2, VolumeX, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  FRAME_A,
  FRAME_B,
  RAINBOW,
  RAINBOW_TOP_ROW,
  SPRITE_COLS,
  SPRITE_ROWS,
  renderFrame,
} from "@/data/sprite";
import { useI18n } from "@/hooks/useI18n";
import { createGameAudio, type GameAudio } from "@/lib/gameAudio";
import { cn } from "@/lib/utils";

/* ---------- persistence ---------- */
const KEY_LAST = "vg.game.last";
const KEY_BEST = "vg.game.best";
const KEY_MUTED = "vg.game.muted";

function readNumber(key: string) {
  try {
    const v = Number(localStorage.getItem(key));
    return Number.isFinite(v) ? v : 0;
  } catch {
    return 0;
  }
}
function readBool(key: string) {
  try {
    return localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}
function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* private mode */
  }
}

/* ---------- tuning ---------- */
const GRAVITY = 1500;
/** Instant kick on tap / key press. */
const FLAP = -330;
/** Extra upward acceleration while the finger/key is held, for at most HOLD_MAX seconds. */
const THRUST = 2500;
const HOLD_MAX = 0.32;
const MAX_UP = -640;
const BASE_SPEED = 210;
const MAX_SPEED = 540;
const SPEED_PER_POINT = 7;
const FRAME_MS = 350;

/** The legacy HTML she has to dodge. Code, not copy — intentionally untranslated. */
const TAGS = [
  "<table>",
  "<marquee>",
  "<blink>",
  "<center>",
  "<font>",
  "<frameset>",
  "<div><div><div>",
  "!important",
  "<br><br><br>",
  'onclick="…"',
  "<iframe>",
  "<applet>",
  "<spacer>",
  "border=0",
  "<tt>",
  "<!-- TODO -->",
];
const TAG_COLORS = ["#ff3b3b", "#ff9d1c", "#ffe63b", "#4ff05a", "#3ba1ff", "#a765ff", "#ff66c4", "#4dd2ff"];

type Phase = "ready" | "playing" | "over";
type Reason = { kind: "tag"; tag: string } | { kind: "floor" };

type Obstacle = {
  x: number;
  y: number;
  w: number;
  h: number;
  tag: string;
  color: string;
  passed: boolean;
};

type World = {
  w: number;
  h: number;
  scale: number;
  pw: number;
  ph: number;
  px: number;
  py: number;
  vy: number;
  speed: number;
  score: number;
  dist: number;
  nextSpawn: number;
  obstacles: Obstacle[];
  stars: { x: number; y: number; z: number }[];
  t: number;
  frame: 0 | 1;
  frameT: number;
  frames: [HTMLCanvasElement, HTMLCanvasElement];
};

const FLAP_KEYS = new Set(["Space", "ArrowUp", "KeyW"]);

/** Phones and tablets (iPad included) → touch instructions instead of keyboard ones. */
function detectTouch() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: none) and (pointer: coarse)").matches || navigator.maxTouchPoints > 1;
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

function makeStars(w: number, h: number) {
  return Array.from({ length: 70 }, () => ({ x: rand(0, w), y: rand(0, h), z: pick([0.3, 0.6, 1]) }));
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/* ---------- pure drawing / spawning helpers ---------- */
function fontFor(w: World) {
  return `${w.scale === 2 ? 9 : 12}px "Press Start 2P", monospace`;
}

function spawn(w: World, ctx: CanvasRenderingContext2D) {
  ctx.font = fontFor(w);
  const h = w.scale === 2 ? 30 : 38;
  const make = (y: number): Obstacle => {
    const tag = pick(TAGS);
    const tw = ctx.measureText(tag).width;
    return { x: w.w + 10, y, w: Math.ceil(tw) + 22, h, tag, color: pick(TAG_COLORS), passed: false };
  };
  const pair = w.score >= 4 && Math.random() < 0.35;
  if (pair) {
    const gap = w.ph * 2.3;
    const gapY = rand(24 + h, w.h - gap - 24 - h);
    w.obstacles.push(make(gapY - h), make(gapY + gap));
  } else {
    w.obstacles.push(make(rand(12, w.h - h - 12)));
  }
}

function drawRainbow(ctx: CanvasRenderingContext2D, w: World) {
  const segW = w.scale * 8;
  const stripeH = w.scale * 2;
  const segs = 7;
  const right = Math.round(w.px) + w.scale * 9;
  for (let i = 0; i < segs; i++) {
    const x = right - segW * (segs - i);
    const off = (i + w.frame) % 2 === 0 ? w.scale : 0;
    RAINBOW.forEach((c, j) => {
      ctx.fillStyle = c;
      ctx.fillRect(x, Math.round(w.py) + RAINBOW_TOP_ROW * w.scale + off + j * stripeH, segW, stripeH);
    });
  }
}

function drawObstacle(ctx: CanvasRenderingContext2D, w: World, o: Obstacle) {
  const x = Math.round(o.x);
  const y = Math.round(o.y);
  roundRect(ctx, x, y, o.w, o.h, 4);
  ctx.fillStyle = "#10254a";
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = o.color;
  ctx.stroke();
  ctx.font = fontFor(w);
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillStyle = o.color;
  ctx.fillText(o.tag, x + o.w / 2, y + o.h / 2 + 1);
}

type Props = { onClose: () => void };

export function DevGame({ onClose }: Props) {
  const { t } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<World | null>(null);
  const phaseRef = useRef<Phase>("ready");
  const audioRef = useRef<GameAudio | null>(null);
  const primaryRef = useRef<HTMLButtonElement>(null);
  /** Hold state: while active (and under HOLD_MAX) the player keeps climbing. */
  const holdRef = useRef({ active: false, t: 0 });

  const [isTouch] = useState(detectTouch);
  const [phase, setPhase] = useState<Phase>("ready");
  const [score, setScore] = useState(0);
  const [last, setLast] = useState(() => readNumber(KEY_LAST));
  const [best, setBest] = useState(() => readNumber(KEY_BEST));
  const [isNewBest, setIsNewBest] = useState(false);
  const [reason, setReason] = useState<Reason | null>(null);
  const [muted, setMuted] = useState(() => readBool(KEY_MUTED));

  const setPhaseBoth = (p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  };

  /* ---------- world setup / resize ---------- */
  const resetPlayer = (w: World) => {
    w.py = w.h / 2 - w.ph / 2;
    w.vy = 0;
    w.speed = BASE_SPEED;
    w.score = 0;
    w.dist = 0;
    w.nextSpawn = w.w * 0.6;
    w.obstacles = [];
  };

  const layout = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const rect = wrap.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    const ctx = canvas.getContext("2d")!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = false;

    const scale = rect.width < 520 ? 2 : 3;
    const prev = worldRef.current;
    const w: World = {
      w: rect.width,
      h: rect.height,
      scale,
      pw: SPRITE_COLS * scale,
      ph: SPRITE_ROWS * scale,
      px: Math.max(24, rect.width * 0.18),
      py: prev?.py ?? 0,
      vy: prev?.vy ?? 0,
      speed: prev?.speed ?? BASE_SPEED,
      score: prev?.score ?? 0,
      dist: prev?.dist ?? 0,
      nextSpawn: prev?.nextSpawn ?? 0,
      obstacles: prev?.obstacles ?? [],
      stars: makeStars(rect.width, rect.height),
      t: prev?.t ?? 0,
      frame: prev?.frame ?? 0,
      frameT: prev?.frameT ?? 0,
      frames:
        prev && prev.scale === scale
          ? prev.frames
          : [renderFrame(FRAME_A, scale), renderFrame(FRAME_B, scale)],
    };
    if (!prev || phaseRef.current !== "playing") resetPlayer(w);
    w.py = Math.min(Math.max(0, w.py), w.h - w.ph);
    worldRef.current = w;
  }, []);

  /* ---------- game actions ---------- */
  const start = useCallback(() => {
    const w = worldRef.current;
    if (!w) return;
    const y = w.py;
    resetPlayer(w);
    // take off from where she's hovering (or from the crash site, lifted off the floor)
    w.py = Math.min(y, w.h * 0.6 - w.ph / 2);
    w.vy = FLAP * 0.8;
    setScore(0);
    setIsNewBest(false);
    setReason(null);
    setPhaseBoth("playing");
    audioRef.current?.start();
  }, []);

  const flap = () => {
    const w = worldRef.current;
    if (w) w.vy = Math.min(w.vy, FLAP);
  };

  const crash = useCallback((why: Reason) => {
    const w = worldRef.current;
    if (!w || phaseRef.current !== "playing") return;
    const a = audioRef.current;
    a?.stop();
    a?.crash();
    const prevBest = readNumber(KEY_BEST);
    const prevLast = readNumber(KEY_LAST);
    write(KEY_LAST, String(w.score));
    if (w.score > prevBest) {
      write(KEY_BEST, String(w.score));
      setIsNewBest(w.score > 0);
    }
    setLast(prevLast);
    setBest(Math.max(prevBest, w.score));
    setReason(why);
    setPhaseBoth("over");
  }, []);

  /** Finger down / key down: kick upwards and start "holding" for extra climb. */
  const press = useCallback(() => {
    if (phaseRef.current === "ready") start();
    else if (phaseRef.current === "playing") flap();
    else return;
    holdRef.current = { active: true, t: 0 };
  }, [start]);

  /** Finger up / key up: stop climbing. */
  const release = useCallback(() => {
    holdRef.current.active = false;
  }, []);

  const toggleMuted = () => {
    setMuted((m) => {
      const next = !m;
      write(KEY_MUTED, next ? "1" : "0");
      audioRef.current?.setMuted(next);
      return next;
    });
  };

  /* ---------- lifecycle ---------- */
  useEffect(() => {
    audioRef.current = createGameAudio(readBool(KEY_MUTED));
    void document.fonts?.load('12px "Press Start 2P"');
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    layout();
    const onResize = () => layout();
    window.addEventListener("resize", onResize);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if ((e.target as HTMLElement | null)?.tagName === "BUTTON") return;
      if (FLAP_KEYS.has(e.code)) {
        e.preventDefault();
        if (!e.repeat) press();
      } else if (e.code === "Enter" && phaseRef.current === "over") {
        start();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (FLAP_KEYS.has(e.code)) release();
    };
    // pointerup on window: the finger may lift outside the canvas (or after the intro panel unmounts)
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    window.addEventListener("blur", release);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("blur", release);
      document.body.style.overflow = prevOverflow;
      audioRef.current?.dispose();
      audioRef.current = null;
    };
  }, [layout, onClose, press, release, start]);

  /* Focus the primary button whenever a panel is shown (Space/Enter then start/restart). */
  useEffect(() => {
    if (phase !== "playing") primaryRef.current?.focus();
  }, [phase]);

  /* ---------- main loop ---------- */
  useEffect(() => {
    let raf = 0;
    let lastTs = performance.now();

    const tick = (ts: number) => {
      raf = requestAnimationFrame(tick);
      const w = worldRef.current;
      const canvas = canvasRef.current;
      if (!w || !canvas) return;
      const ctx = canvas.getContext("2d")!;
      const dt = Math.min(0.033, (ts - lastTs) / 1000);
      lastTs = ts;
      w.t += dt;
      w.frameT += dt * 1000;
      if (w.frameT > FRAME_MS) {
        w.frameT = 0;
        w.frame = w.frame === 0 ? 1 : 0;
      }

      const playing = phaseRef.current === "playing";
      const scroll = playing ? w.speed : BASE_SPEED * 0.4;

      /* physics */
      if (playing) {
        const hold = holdRef.current;
        if (hold.active && hold.t < HOLD_MAX) {
          w.vy -= THRUST * dt;
          hold.t += dt;
        }
        w.vy = Math.max(MAX_UP, w.vy + GRAVITY * dt);
        w.py += w.vy * dt;
        if (w.py < 0) {
          w.py = 0;
          w.vy = 0;
        }
        w.dist += w.speed * dt;
        w.speed = Math.min(MAX_SPEED, BASE_SPEED + w.score * SPEED_PER_POINT);

        const hx = w.px + w.pw * 0.28;
        const hy = w.py + w.ph * 0.08;
        const hw = w.pw * 0.68;
        const hh = w.ph * 0.88;

        if (hy + hh > w.h) {
          crash({ kind: "floor" });
        }

        if (phaseRef.current === "playing" && w.dist >= w.nextSpawn) {
          spawn(w, ctx);
          w.nextSpawn = w.dist + rand(230, 360) + w.pw * 0.5;
        }

        for (const o of w.obstacles) {
          o.x -= w.speed * dt;
          if (!o.passed && o.x + o.w < hx) {
            o.passed = true;
            w.score += 1;
            setScore(w.score);
            audioRef.current?.dodge();
          }
          if (hx < o.x + o.w && hx + hw > o.x && hy < o.y + o.h && hy + hh > o.y) {
            crash({ kind: "tag", tag: o.tag });
            break;
          }
        }
        w.obstacles = w.obstacles.filter((o) => o.x + o.w > -10);
      } else if (phaseRef.current === "ready") {
        // hover below the intro panel
        w.py = w.h * 0.68 - w.ph / 2 + Math.sin(w.t * 2) * w.scale * 4;
      }

      /* draw */
      ctx.fillStyle = "#0b1d3a";
      ctx.fillRect(0, 0, w.w, w.h);

      for (const s of w.stars) {
        s.x -= scroll * s.z * 0.25 * dt;
        if (s.x < -2) {
          s.x = w.w + 2;
          s.y = rand(0, w.h);
        }
        ctx.fillStyle = s.z === 1 ? "#ffffff" : "#9fb0d0";
        ctx.globalAlpha = 0.35 + s.z * 0.5;
        ctx.fillRect(Math.round(s.x), Math.round(s.y), s.z === 1 ? 2 : 1, s.z === 1 ? 2 : 1);
      }
      ctx.globalAlpha = 1;

      drawRainbow(ctx, w);
      ctx.drawImage(w.frames[w.frame], Math.round(w.px), Math.round(w.py));

      for (const o of w.obstacles) drawObstacle(ctx, w, o);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [crash]);

  /* ---------- UI ---------- */
  const overTitle =
    reason?.kind === "tag" ? t("dev.game.over.tag", { tag: reason.tag }) : t("dev.game.over.floor");
  const device = isTouch ? "touch" : "desktop";
  const howTo: { icon: string; key: string }[] = [
    { icon: isTouch ? "👆" : "⌨️", key: `dev.game.how.up.${device}` },
    { icon: "⏱", key: `dev.game.how.hold.${device}` },
    { icon: "💥", key: "dev.game.how.avoid" },
    { icon: "⭐", key: "dev.game.how.score" },
  ];

  return (
    <div
      className="fixed inset-0 z-[110] flex flex-col bg-[#0b1d3a] text-[#eef3ff]"
      role="dialog"
      aria-modal="true"
      aria-label={t("dev.game.title")}
    >
      {/* top bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between p-3 sm:p-4">
        <div className="font-pixel text-xs leading-relaxed sm:text-sm">
          <div className="text-[#ffe63b]">
            {t("dev.game.score")}: {score}
          </div>
          <div className="mt-1 text-[10px] text-[#9fb0d0] sm:text-xs">
            {t("dev.game.best")}: {best}
          </div>
        </div>
        <div className="pointer-events-auto flex gap-2">
          <button
            type="button"
            onClick={toggleMuted}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#23375f] bg-[#10254a] transition-colors hover:border-[#4dd2ff]"
            aria-label={t(muted ? "dev.game.unmute" : "dev.game.mute")}
            title={t(muted ? "dev.game.unmute" : "dev.game.mute")}
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#23375f] bg-[#10254a] transition-colors hover:border-[#ff66c4]"
            aria-label={t("dev.game.close")}
            title={t("dev.game.close")}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* playfield */}
      <div ref={wrapRef} className="relative flex-1 touch-none select-none">
        <canvas
          ref={canvasRef}
          className="block h-full w-full pixelated"
          onPointerDown={(e) => {
            e.preventDefault();
            press();
          }}
        />

        {phase !== "playing" && (
          <div
            className="absolute inset-0 flex items-start justify-center overflow-y-auto p-3 pt-[68px] sm:p-4 sm:pt-[12vh]"
            onPointerDown={(e) => {
              e.preventDefault();
              press();
            }}
          >
            <div
              className={cn(
                "w-full max-w-md rounded-md border-2 bg-[#0b1d3a]/95 p-4 text-center shadow-2xl sm:p-8",
                phase === "over" ? "border-[#ff3b3b]" : "border-[#ff66c4]",
              )}
              onPointerDown={(e) => e.stopPropagation()}
            >
              {phase === "ready" ? (
                <>
                  <p className="font-pixel text-[10px] text-[#4dd2ff] sm:text-xs">{t("dev.game.eyebrow")}</p>
                  <h2 className="rainbow-text mt-3 font-pixel text-lg leading-snug sm:text-2xl">
                    {t("dev.game.title")}
                  </h2>
                  <p className="mt-3 font-mono text-[13px] text-[#9fb0d0] sm:mt-4 sm:text-sm">{t("dev.game.hint")}</p>
                  <div className="mt-4 rounded-md border border-[#23375f] bg-[#10254a] p-3 text-left sm:mt-5 sm:p-4">
                    <p className="font-pixel text-[10px] text-[#ffe63b]">{t("dev.game.how.title")}</p>
                    <ol className="mt-2 space-y-1.5 font-mono text-xs leading-snug text-[#eef3ff] sm:mt-3 sm:space-y-2 sm:text-[13px]">
                      {howTo.map((step) => (
                        <li key={step.key} className="flex gap-3">
                          <span className="w-5 shrink-0 text-center" aria-hidden="true">
                            {step.icon}
                          </span>
                          <span>{t(step.key)}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </>
              ) : (
                <>
                  <p className="font-pixel text-[10px] text-[#ff3b3b] sm:text-xs">{t("dev.game.eyebrow.over")}</p>
                  <h2 className="mt-3 font-mono text-xl font-bold leading-snug sm:text-2xl">{overTitle}</h2>
                  {isNewBest && (
                    <p className="rainbow-text mt-3 font-pixel text-xs sm:text-sm">{t("dev.game.newBest")}</p>
                  )}
                </>
              )}

              <dl className="mt-4 grid grid-cols-3 sm:mt-6 gap-px overflow-hidden rounded-md border border-[#23375f] bg-[#23375f]">
                {(
                  [
                    ["dev.game.now", phase === "over" ? score : "–"],
                    ["dev.game.last", last],
                    ["dev.game.best", best],
                  ] as const
                ).map(([key, value]) => (
                  <div key={key} className="bg-[#10254a] p-3">
                    <dd className="font-pixel text-base text-[#ffe63b] sm:text-lg">{value}</dd>
                    <dt className="mt-2 font-mono text-[11px] text-[#9fb0d0]">{t(key)}</dt>
                  </div>
                ))}
              </dl>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:mt-6">
                <button
                  ref={primaryRef}
                  type="button"
                  onClick={start}
                  className="rainbow-border inline-flex h-11 items-center rounded-md bg-[#10254a] px-6 font-pixel text-xs transition-colors hover:bg-[#ff66c4] hover:text-[#0b1d3a]"
                >
                  {t(phase === "over" ? "dev.game.again" : "dev.game.start")}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-11 items-center rounded-md border border-[#23375f] px-5 font-mono text-sm transition-colors hover:border-[#4dd2ff]"
                >
                  {t("dev.game.close")}
                </button>
              </div>
              <p className="mt-4 font-mono text-[11px] text-[#6f7fa3]">{t(`dev.game.controls.${device}`)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
