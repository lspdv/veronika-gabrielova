import { cn } from "@/lib/utils";

/**
 * Pixel-art cat + wiggly rainbow, hand-drawn (no external assets).
 * Legend: . empty · k outline · t toast · p frosting · s sprinkle · g fur · c cheek
 */
const SPRITE = [
  "......kkkkkkkkkkkkkk.........",
  ".....kttttttttttttttk........",
  ".....ktpppppppppppptk........",
  ".....ktppspppppsppptkk.....kk",
  ".....ktpppppppppppptkgk...kgk",
  ".....ktpppppspppppptkggkkkggk",
  "kkk..ktpppppppppppptkgggggggk",
  "kggkkktpsppppppppsptkgkgggkgk",
  "kggggktpppppppppppptkgggggggk",
  ".kkkkktppppsppppppptkcgggggck",
  ".....ktpppppppppppptkgkkkkkgk",
  ".....ktpppppppspppptkgggggggk",
  ".....kttttttttttttttkkkkkkkk.",
  "......kkkkkkkkkkkkkk.........",
  ".......kggk.kggk...kggk.kggk.",
  ".......kggk.kggk...kggk.kggk.",
  ".......kkkk.kkkk...kkkk.kkkk.",
];

const COLORS: Record<string, string> = {
  k: "#111111",
  t: "#f7c98a",
  p: "#ff99ff",
  s: "#ff3399",
  g: "#9a9a9a",
  c: "#ff9999",
};

const RAINBOW = ["#ff3b3b", "#ff9d1c", "#ffe63b", "#4ff05a", "#3ba1ff", "#a765ff"];

const COLS = Math.max(...SPRITE.map((r) => r.length));
const ROWS = SPRITE.length;

type Props = {
  /** px per sprite cell */
  scale?: number;
  className?: string;
  /** number of rainbow segments (each 8 cells wide) */
  segments?: number;
};

export function NyanCat({ scale = 4, className, segments = 30 }: Props) {
  const stripeH = scale * 2;
  const segW = scale * 8;

  return (
    <div
      className={cn("flex items-start overflow-hidden", className)}
      style={{ height: ROWS * scale, ["--px" as string]: `${scale}px` }}
      aria-hidden="true"
    >
      <div
        className="flex flex-1 justify-end overflow-hidden"
        style={{ paddingTop: scale, height: RAINBOW.length * stripeH + scale * 2 }}
      >
        {Array.from({ length: segments }, (_, i) => (
          <div
            key={i}
            className={cn("shrink-0", i % 2 === 0 ? "nyan-seg-a" : "nyan-seg-b")}
            style={{ width: segW }}
          >
            {RAINBOW.map((c) => (
              <div key={c} style={{ height: stripeH, background: c }} />
            ))}
          </div>
        ))}
      </div>
      <svg
        className="nyan-cat -ml-[1px] shrink-0 pixelated"
        width={COLS * scale}
        height={ROWS * scale}
        viewBox={`0 0 ${COLS} ${ROWS}`}
        shapeRendering="crispEdges"
      >
        {SPRITE.map((row, y) =>
          Array.from(row).map((ch, x) => {
            const fill = COLORS[ch];
            if (!fill) return null;
            return <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={fill} />;
          }),
        )}
      </svg>
    </div>
  );
}
