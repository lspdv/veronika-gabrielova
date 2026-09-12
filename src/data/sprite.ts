/**
 * Pixel-art Veronika: black-haired developer flying with her laptop.
 * Shared by the hero sprite (SVG) and the easter-egg game (canvas).
 *
 * Legend: . empty · k outline · h hair · H hair shine · f skin · c cheek
 *         o hoodie · O hoodie shade · j jeans · x sneakers
 *         w laptop · W screen · g / p code on screen
 */
export const FRAME_A = [
  "...........kkkkkkkkkk...............",
  ".........kkhhhhhhhhhhkk.............",
  "........khhhhhHHHhhhhhhk............",
  ".......khhhhhHHhhhhhhhhhk...........",
  "......khhhhhhhhhhhhhhhhhk...........",
  ".....khhhhhhhhhkfffffffhk...........",
  "....khhhhhhhhhkfffffffffk...........",
  "...khhhhhhhhhhkffkfffffkfk..........",
  "..khhHHHhhhhhhkffkfffffkfk..........",
  ".khHHhhhhhhhhhkfffffffffffk.........",
  ".khhhhhhhhhhhhkfcfffffcfffk.........",
  "khhhhhhhhhhhhhkfffkkkfffffk.........",
  "khhhhhhhhhhhhhkkffffffffkk....kkkkkk",
  "khhhhhhHHHhhhhhhkkfffkk.......kWWWWk",
  ".khhhHHhhhhhhhhhhkoookk.......kggWWk",
  ".khHHhhhhhhhhhhhkoooooook.....kWWppk",
  "..khhhhhhhhhhhhkooooooooook...kgggWk",
  "..khhhhhhhhhhhkoooooooooook...kWWWWk",
  "...khhhHHhhhhhkooooooooooffk..kpgWWk",
  "....khHHhhhhhhkOooooooookffk..kkkkkk",
  ".....khhhhhhhhkOOookkkkkkkkkkkkkkkkk",
  "......khhhhhhhkjjjjjjjjkwwwwwwwwwwwk",
  ".......khhhhhhkjjjjjjjjjkkkkkkkkkkkk",
  "........kkkkkkkjjjjjjjjjjjk.........",
  "...............kxxxkkkkkkxxxk.......",
  "................kkk......kkk........",
];

/** Second frame: the streaming part of the hair shifts down one row → flutter. */
const HAIR_TAIL_COLS = 9;
export const FRAME_B = FRAME_A.map((row, y) =>
  Array.from(row)
    .map((ch, x) => (x < HAIR_TAIL_COLS ? (y === 0 ? "." : FRAME_A[y - 1][x]) : ch))
    .join(""),
);

export const SPRITE_COLORS: Record<string, string> = {
  k: "#0e0e14",
  h: "#1c1c27",
  H: "#4a4a63",
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

/** Nyan-style wiggly rainbow, in the site's neon palette (matches .rainbow-text). */
export const RAINBOW = ["#ff3b3b", "#ff9d1c", "#ffe63b", "#4ff05a", "#3ba1ff", "#a765ff"];
/** Sprite row where the top of the rainbow sits (hidden behind the streaming hair). */
export const RAINBOW_TOP_ROW = 7;

export const SPRITE_COLS = Math.max(...FRAME_A.map((r) => r.length));
export const SPRITE_ROWS = FRAME_A.length;

/** Pre-render a frame to an offscreen canvas (for the game). */
export function renderFrame(frame: string[], scale: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = SPRITE_COLS * scale;
  c.height = SPRITE_ROWS * scale;
  const ctx = c.getContext("2d")!;
  frame.forEach((row, y) => {
    Array.from(row).forEach((ch, x) => {
      const fill = SPRITE_COLORS[ch];
      if (!fill) return;
      ctx.fillStyle = fill;
      ctx.fillRect(x * scale, y * scale, scale, scale);
    });
  });
  return c;
}
