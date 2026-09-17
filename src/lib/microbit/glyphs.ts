/**
 * Micro:bit glyph library.
 *
 * LED patterns are stored as 5 rows of 5 booleans, exactly like the real
 * device. Text uses a 5×3 font so `showString()` can scroll across the matrix
 * just like MakeCode does.
 */

export type LedMatrix = boolean[][];

export function createMatrix(): LedMatrix {
  return Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => false));
}

export function fromTextRows(rows: string[]): LedMatrix {
  return rows.map((row) =>
    row
      .replace(/\s/g, "")
      .split("")
      .map((char) => char === "1"),
  );
}

export const icons: Record<string, LedMatrix> = {
  heart: fromTextRows([
    "01010",
    "11111",
    "11111",
    "01110",
    "00100",
  ]),
  smallHeart: fromTextRows([
    "00000",
    "01010",
    "01110",
    "00100",
    "00000",
  ]),
  happy: fromTextRows([
    "00000",
    "01010",
    "00000",
    "10001",
    "01110",
  ]),
  sad: fromTextRows([
    "00000",
    "01010",
    "00000",
    "01110",
    "10001",
  ]),
  surprised: fromTextRows([
    "01010",
    "00000",
    "01110",
    "01010",
    "01110",
  ]),
  square: fromTextRows([
    "11111",
    "11111",
    "11111",
    "11111",
    "11111",
  ]),
  diamond: fromTextRows([
    "00100",
    "01010",
    "10001",
    "01010",
    "00100",
  ]),
  smallDiamond: fromTextRows([
    "00000",
    "00100",
    "01010",
    "00100",
    "00000",
  ]),
  arrowNorth: fromTextRows([
    "00100",
    "01110",
    "10101",
    "00100",
    "00100",
  ]),
  arrowEast: fromTextRows([
    "00100",
    "00010",
    "11111",
    "00010",
    "00100",
  ]),
  tick: fromTextRows([
    "00001",
    "00010",
    "10100",
    "01000",
    "00000",
  ]),
  cross: fromTextRows([
    "10001",
    "01010",
    "00100",
    "01010",
    "10001",
  ]),
  duck: fromTextRows([
    "01100",
    "11111",
    "10111",
    "11110",
    "00000",
  ]),
  house: fromTextRows([
    "00100",
    "01110",
    "11111",
    "01110",
    "01110",
  ]),
  ghost: fromTextRows([
    "01110",
    "10101",
    "11111",
    "11111",
    "10101",
  ]),
  scissors: fromTextRows([
    "10001",
    "01010",
    "00100",
    "01010",
    "10001",
  ]),
  target: fromTextRows([
    "00100",
    "01110",
    "10101",
    "01110",
    "00100",
  ]),
  noEntry: fromTextRows([
    "01110",
    "10001",
    "10101",
    "10001",
    "01110",
  ]),
  umbral: fromTextRows([
    "11111",
    "11111",
    "11111",
    "11111",
    "00000",
  ]),
  northEast: fromTextRows([
    "00011",
    "00111",
    "00101",
    "01000",
    "10000",
  ]),
  yes: fromTextRows([
    "00001",
    "00010",
    "10100",
    "01000",
    "00000",
  ]),
};

export const iconNames = Object.keys(icons);

/**
 * 5×3 font, one entry per character. Each row is a 3-bit value where the most
 * significant bit is the left column.
 */
export const font: Record<string, number[]> = {
  A: [2, 5, 7, 5, 5],
  B: [6, 5, 6, 5, 6],
  C: [3, 4, 4, 4, 3],
  D: [6, 5, 5, 5, 6],
  E: [7, 4, 6, 4, 7],
  F: [7, 4, 6, 4, 4],
  G: [3, 4, 5, 5, 3],
  H: [5, 5, 7, 5, 5],
  I: [7, 2, 2, 2, 7],
  J: [1, 1, 1, 5, 2],
  K: [5, 5, 6, 5, 5],
  L: [4, 4, 4, 4, 7],
  M: [5, 7, 7, 5, 5],
  N: [5, 7, 5, 5, 5],
  O: [2, 5, 5, 5, 2],
  P: [6, 5, 6, 4, 4],
  Q: [2, 5, 6, 3, 1],
  R: [6, 5, 6, 5, 5],
  S: [3, 4, 2, 1, 6],
  T: [7, 2, 2, 2, 2],
  U: [5, 5, 5, 5, 7],
  V: [5, 5, 5, 5, 2],
  W: [5, 5, 7, 7, 5],
  X: [5, 5, 2, 5, 5],
  Y: [5, 5, 2, 2, 2],
  Z: [7, 1, 2, 4, 7],
  "0": [7, 5, 5, 5, 7],
  "1": [2, 6, 2, 2, 7],
  "2": [7, 1, 7, 4, 7],
  "3": [7, 1, 3, 1, 7],
  "4": [5, 5, 7, 1, 1],
  "5": [7, 4, 7, 1, 7],
  "6": [7, 4, 7, 5, 7],
  "7": [7, 1, 1, 1, 1],
  "8": [7, 5, 7, 5, 7],
  "9": [7, 5, 7, 1, 7],
  " ": [0, 0, 0, 0, 0],
  "!": [2, 2, 2, 0, 2],
  "?": [6, 1, 2, 0, 2],
  ".": [0, 0, 0, 0, 2],
  ",": [0, 0, 0, 2, 2],
  ":": [0, 2, 0, 2, 0],
  "+": [0, 2, 7, 2, 0],
  "-": [0, 0, 7, 0, 0],
  "=": [0, 7, 0, 7, 0],
  "/": [1, 2, 2, 4, 4],
  "'": [2, 2, 0, 0, 0],
  "*": [5, 2, 7, 2, 5],
  "%": [5, 1, 2, 4, 5],
  "(": [1, 2, 2, 2, 1],
  ")": [4, 2, 2, 2, 4],
};

/** Converts one character into a 5-row × 4-column block (3 columns + gap). */
export function characterMatrix(character: string): boolean[][] {
  const glyph = font[character.toUpperCase()] ?? font["?"];
  return glyph.map((row) => [
    (row & 4) !== 0,
    (row & 2) !== 0,
    (row & 1) !== 0,
    false,
  ]);
}

/** The scroll frames for a string: each frame is a 5×5 window over the text. */
export function stringFrames(text: string, options: { pad?: number } = {}): LedMatrix[] {
  const pad = options.pad ?? 2;
  const columns: boolean[][] = [];
  for (let i = 0; i < pad; i += 1) columns.push([false, false, false, false, false]);
  for (const character of text) {
    const matrix = characterMatrix(character);
    for (let column = 0; column < 4; column += 1) {
      columns.push(matrix.map((row) => row[column]));
    }
  }
  for (let i = 0; i < pad; i += 1) columns.push([false, false, false, false, false]);

  const frames: LedMatrix[] = [];
  for (let start = 0; start <= columns.length - 5; start += 1) {
    frames.push(
      Array.from({ length: 5 }, (_, row) =>
        Array.from({ length: 5 }, (_, column) => columns[start + column]?.[row] ?? false),
      ),
    );
  }
  return frames.length ? frames : [createMatrix()];
}

/** Dice faces rendered as LED patterns. */
export const diceFaces: Record<number, LedMatrix> = {
  1: fromTextRows(["00000", "00000", "00100", "00000", "00000"]),
  2: fromTextRows(["10000", "00000", "00000", "00000", "00001"]),
  3: fromTextRows(["10000", "00000", "00100", "00000", "00001"]),
  4: fromTextRows(["10001", "00000", "00000", "00000", "10001"]),
  5: fromTextRows(["10001", "00000", "00100", "00000", "10001"]),
  6: fromTextRows(["10001", "00000", "10001", "00000", "10001"]),
};

export function numberMatrix(value: number): LedMatrix {
  const sign = value < 0 ? 1 : 0;
  const digits = Math.abs(Math.round(value)).toString().slice(0, sign ? 2 : 3).split("");
  const columns: boolean[][] = [];
  if (sign) columns.push([false, true, false, true, false]);
  digits.forEach((digit, index) => {
    const matrix = characterMatrix(digit);
    for (let column = 0; column < 3; column += 1) {
      columns.push(matrix.map((row) => row[column]));
    }
    if (index < digits.length - 1) columns.push([false, false, false, false, false]);
  });
  const frames = columns.length <= 5 ? [columns] : chunkColumns(columns, 5);
  if (frames.length === 1) {
    const padded = frames[0];
    while (padded.length < 5) padded.push([false, false, false, false, false]);
    return Array.from({ length: 5 }, (_, row) => padded.map((column) => column[row] ?? false));
  }
  return Array.from({ length: 5 }, (_, row) => frames[0][row] ?? false).map((row, index) =>
    frames[0].map((column) => column[index] ?? false),
  );
}

function chunkColumns(columns: boolean[][], size: number): boolean[][][] {
  const chunks: boolean[][][] = [];
  for (let start = 0; start < columns.length; start += size) {
    chunks.push(columns.slice(start, start + size));
  }
  return chunks;
}

/** All the scroll frames of a number, for animated display. */
export function numberFrames(value: number): LedMatrix[] {
  const text = String(Math.round(value));
  const columns: boolean[][] = [];
  text.split("").forEach((digit, index) => {
    const matrix = characterMatrix(digit);
    for (let column = 0; column < 3; column += 1) {
      columns.push(matrix.map((row) => row[column]));
    }
    if (index < text.length - 1) columns.push([false, false, false, false, false]);
  });
  while (columns.length < 5) columns.push([false, false, false, false, false]);
  const frames: LedMatrix[] = [];
  for (let start = 0; start <= Math.max(0, columns.length - 5); start += 1) {
    frames.push(
      Array.from({ length: 5 }, (_, row) =>
        Array.from({ length: 5 }, (_, column) => columns[start + column]?.[row] ?? false),
      ),
    );
  }
  return frames;
}
