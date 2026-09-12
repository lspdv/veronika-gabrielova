import {
  FRAME_A,
  FRAME_B,
  RAINBOW,
  RAINBOW_TOP_ROW,
  SPRITE_COLORS,
  SPRITE_COLS,
  SPRITE_ROWS,
} from "@/data/sprite";
import { useI18n } from "@/hooks/useI18n";
import { cn } from "@/lib/utils";

/**
 * Pixel-art Veronika flying on a nyan-style wiggly rainbow (the parody:
 * no pop-tart cat, just a dev). Hand-drawn, no external assets.
 * Pass `onClick` to make it an easter-egg button.
 */
function Sprite({ frame, className }: { frame: string[]; className: string }) {
  return (
    <g className={className}>
      {frame.map((row, y) =>
        Array.from(row).map((ch, x) => {
          const fill = SPRITE_COLORS[ch];
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
  /** number of rainbow segments (each 8 cells wide) */
  segments?: number;
  onClick?: () => void;
};

export function PixelDev({ scale = 4, className, segments = 30, onClick }: Props) {
  const { t } = useI18n();
  const stripeH = scale * 2;
  const segW = scale * 8;

  const body = (
    <>
      <div
        className="flex flex-1 justify-end overflow-hidden"
        style={{
          paddingTop: RAINBOW_TOP_ROW * scale,
          height: (RAINBOW_TOP_ROW + 1) * scale + RAINBOW.length * stripeH,
        }}
      >
        {Array.from({ length: segments }, (_, i) => (
          <div
            key={i}
            className={cn("shrink-0", i % 2 === 0 ? "dev-wave-a" : "dev-wave-b")}
            style={{ width: segW }}
          >
            {RAINBOW.map((c) => (
              <div key={c} style={{ height: stripeH, background: c }} />
            ))}
          </div>
        ))}
      </div>
      <svg
        className="dev-sprite -ml-[1px] shrink-0 pixelated"
        width={SPRITE_COLS * scale}
        height={SPRITE_ROWS * scale}
        viewBox={`0 0 ${SPRITE_COLS} ${SPRITE_ROWS}`}
        shapeRendering="crispEdges"
      >
        <Sprite frame={FRAME_A} className="dev-frame-a" />
        <Sprite frame={FRAME_B} className="dev-frame-b" />
      </svg>
    </>
  );

  const style = { height: SPRITE_ROWS * scale, ["--px" as string]: `${scale}px` };
  const base = "dev-float flex w-full items-start overflow-hidden";

  if (!onClick) {
    return (
      <div className={cn(base, className)} style={style} aria-hidden="true">
        {body}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        base,
        "group cursor-pointer appearance-none border-0 bg-transparent p-0 text-left",
        className,
      )}
      style={style}
      aria-label={t("dev.game.open")}
      title={t("dev.game.open")}
    >
      {body}
    </button>
  );
}
