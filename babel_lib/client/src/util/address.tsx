const alphabets: string[] = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "-",
  "_",
];

const alphabets_reverse: Record<string, number> = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
  I: 8,
  J: 9,
  K: 10,
  L: 11,
  M: 12,
  N: 13,
  O: 14,
  P: 15,
  Q: 16,
  R: 17,
  S: 18,
  T: 19,
  U: 20,
  V: 21,
  W: 22,
  X: 23,
  Y: 24,
  Z: 25,
  a: 26,
  b: 27,
  c: 28,
  d: 29,
  e: 30,
  f: 31,
  g: 32,
  h: 33,
  i: 34,
  j: 35,
  k: 36,
  l: 37,
  m: 38,
  n: 39,
  o: 40,
  p: 41,
  q: 42,
  r: 43,
  s: 44,
  t: 45,
  u: 46,
  v: 47,
  w: 48,
  x: 49,
  y: 50,
  z: 51,
  "0": 52,
  "1": 53,
  "2": 54,
  "3": 55,
  "4": 56,
  "5": 57,
  "6": 58,
  "7": 59,
  "8": 60,
  "9": 61,
  "-": 62,
  _: 63,
};

const ADDRESS_LEN = 3500;
const ALPHABETS_LEN = alphabets.length;

export const getFirstAddress = () => {
  return alphabets[0].repeat(ADDRESS_LEN);
};

export const getLastAddress = () => {
  return alphabets[ALPHABETS_LEN - 1].repeat(ADDRESS_LEN);
};

const padAddress = (str: string): string => {
  return str.padStart(ADDRESS_LEN, alphabets[0]);
};

export const getNextAddress = (address: string): string | null => {
  address = padAddress(address);
  if (address === alphabets[alphabets.length - 1].repeat(ADDRESS_LEN))
    return null;

  const addressArray = address.split("").reverse();
  for (let i = 0; i < ADDRESS_LEN; i++) {
    const alphabet = addressArray[i];
    const number = alphabets_reverse[alphabet] + 1;
    if (number != ALPHABETS_LEN) {
      addressArray[i] = alphabets[number];
      break;
    }

    addressArray[i] = alphabets[0];
  }

  const nextAddress = addressArray.reverse().join("");
  return nextAddress;
};

export const getPrevAddress = (address: string): string | null => {
  address = padAddress(address);
  if (address === alphabets[0].repeat(ADDRESS_LEN)) return null;

  const addressArray = address.split("").reverse();
  for (let i = 0; i < ADDRESS_LEN; i++) {
    const alphabet = addressArray[i];
    const number = alphabets_reverse[alphabet] - 1;
    if (number != -1) {
      addressArray[i] = alphabets[number];
      break;
    }

    addressArray[i] = alphabets[ALPHABETS_LEN - 1];
  }

  const nextAddress = addressArray.reverse().join("");
  return nextAddress;
};
