import { cn } from "@/lib/utils";

/**
 * Pixel-art Veronika: black-haired developer flying with her laptop,
 * leaving a trail of code tokens behind her. Hand-drawn, no external assets.
 *
 * Legend: . empty · k outline · h hair · H hair shine · f skin · c cheek
 *         o hoodie · O hoodie shade · j jeans · x sneakers
 *         w laptop · W screen · g / p code on screen
 */
const FRAME_A = [
  "...........kkkkkkkkkk...............",
  ".........kkhhhhhhhhhhkk.............",
  "........khhhhhhHhhhhhhhk............",
  ".......khhhhhhhHhhhhhhhhk...........",
  "......khhhhhhhhhhhhhhhhhk...........",
  ".....khhhhhhhhhkfffffffhk...........",
  "....khhhhhhhhhkfffffffffk...........",
  "...khhhhhhhhhhkffkfffffkfk..........",
  "..khhhhhhhhhhhkffkfffffkfk..........",
  ".khhhhhhhhhhhhkfffffffffffk.........",
  ".khhhhhhhhhhhhkfcfffffcfffk.........",
  "khhhhhhhhhhhhhkfffkkkfffffk.........",
  "khhhhhhhhhhhhhkkffffffffkk....kkkkkk",
  "khhhhhhhhhhhhhhhkkfffkk.......kWWWWk",
  ".khhhhhhhhhhhhhhhkoookk.......kggWWk",
  ".khhhhhhhhhhhhhhkoooooook.....kWWppk",
  "..khhhhhhhhhhhhkooooooooook...kgggWk",
  "..khhhhhhhhhhhkoooooooooook...kWWWWk",
  "...khhhhhhhhhhkooooooooooffk..kpgWWk",
  "....khhhhhhhhhkOooooooookffk..kkkkkk",
  ".....khhhhhhhhkOOookkkkkkkkkkkkkkkkk",
  "......khhhhhhhkjjjjjjjjkwwwwwwwwwwwk",
  ".......khhhhhhkjjjjjjjjjkkkkkkkkkkkk",
  "........kkkkkkkjjjjjjjjjjjk.........",
  "...............kxxxkkkkkkxxxk.......",
  "................kkk......kkk........",
];

/** Second frame: the streaming part of the hair shifts down one row → flutter. */
const HAIR_TAIL_COLS = 9;
const FRAME_B = FRAME_A.map((row, y) =>
  Array.from(row)
    .map((ch, x) => (x < HAIR_TAIL_COLS ? (y === 0 ? "." : FRAME_A[y - 1][x]) : ch))
    .join(""),
);

const COLORS: Record<string, string> = {
  k: "#0e0e14",
  h: "#17171f",
  H: "#3b3b4d",
  f: "#f6d5bd",
  c: "#ff9fb0",
  o: "#ff66c4",
  O: "#d64fa3",
  j: "#3b5bdb",
  x: "#f4f4f4",
  w: "#d6dbe8",
  W: "#12315c",
  g: "#4ff05a",
  p: "#ff66c4",
};

const TRAIL_COLORS = ["#ff66c4", "#4dd2ff", "#ffe63b", "#4ff05a", "#a765ff"];
const TOKEN_WIDTHS = [4, 2, 6, 3, 5, 2, 7, 3, 4, 6, 2, 5];
/** Indentation (in cells) of each "line of code" in the trail. */
const TRAIL_INDENT = [0, 2, 4, 2, 0];
/** Cells per second the trail scrolls. Slight per-line variation for depth. */
const TRAIL_SPEED = [22, 20, 24, 21, 23];

const COLS = Math.max(...FRAME_A.map((r) => r.length));
const ROWS = FRAME_A.length;

function trailLine(line: number, scale: number) {
  const stops: string[] = [];
  let x = 0;
  for (let i = 0; i < TOKEN_WIDTHS.length; i++) {
    const w = TOKEN_WIDTHS[(i + line * 3) % TOKEN_WIDTHS.length] * scale;
    const color = TRAIL_COLORS[(i + line) % TRAIL_COLORS.length];
    stops.push(`${color} ${x}px ${x + w}px`, `transparent ${x + w}px ${x + w + scale}px`);
    x += w + scale;
  }
  return { image: `linear-gradient(90deg, ${stops.join(", ")})`, period: x };
}

function Sprite({ frame, className }: { frame: string[]; className: string }) {
  return (
    <g className={className}>
      {frame.map((row, y) =>
        Array.from(row).map((ch, x) => {
          const fill = COLORS[ch];
          if (!fill) return null;
          return <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={fill} />;
        }),
      )}
    </g>
  );
}

type Props = {
  /** px per sprite cell */
  scale?: number;
  className?: string;
};

export function PixelDev({ scale = 4, className }: Props) {
  const lineH = scale * 2;
  const gap = scale;

  return (
    <div
      className={cn("flex items-start overflow-hidden", className)}
      style={{ height: ROWS * scale, ["--px" as string]: `${scale}px` }}
      aria-hidden="true"
    >
      <div className="flex flex-1 flex-col overflow-hidden" style={{ paddingTop: scale * 9, gap }}>
        {TRAIL_INDENT.map((indent, i) => {
          const { image, period } = trailLine(i, scale);
          const duration = period / (TRAIL_SPEED[i] * scale);
          return (
            <div
              key={i}
              className="dev-trail"
              style={{
                height: lineH,
                marginRight: indent * scale,
                backgroundImage: image,
                backgroundSize: `${period}px ${lineH}px`,
                ["--period" as string]: `${period}px`,
                animation: `dev-trail-scroll ${duration}s steps(${period / scale}) infinite`,
              }}
            />
          );
        })}
      </div>
      <svg
        className="dev-sprite -ml-[1px] shrink-0 pixelated"
        width={COLS * scale}
        height={ROWS * scale}
        viewBox={`0 0 ${COLS} ${ROWS}`}
        shapeRendering="crispEdges"
      >
        <Sprite frame={FRAME_A} className="dev-frame-a" />
        <Sprite frame={FRAME_B} className="dev-frame-b" />
      </svg>
    </div>
  );
}
