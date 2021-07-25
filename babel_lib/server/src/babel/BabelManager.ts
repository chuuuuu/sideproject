import babel_alphabets from "../db/babel_alphabets.json";
import babel_alphabets_reverse from "../db/babel_alphabets_reverse.json";
import base64_alphabets from "../db/base64_alphabets.json";
import base64_alphabets_reverse from "../db/base64_alphabets_reverse.json";
import initial_vector from "../db/initial_vector.json";
import shuffle_table from "../db/shuffle_table.json";
import shuffle_table_reverse from "../db/shuffle_table_reverse.json";

type Alphabet = string;
type Index = number;

function split(str: string, blockSize: number) {
  const re = new RegExp(`.{${blockSize}}`, "g");
  const blocks = str.match(re);
  if (!blocks) {
    throw Error("cypher error");
  }

  return blocks;
}

function reverse(str: string) {
  return str.split("").reverse().join("");
}

class AlphabetManager {
  constructor(
    public alphabets: Alphabet[],
    public alphabetsReverse: Record<Alphabet, Index>,
    public bitPerAlphabet: number
  ) {}

  decrypt(cypher: string): string {
    let plain = "";
    const cypherBlocks = split(cypher, this.bitPerAlphabet);

    for (let i = 0; i < cypherBlocks.length; i++) {
      const cypherBlock = cypherBlocks[i];
      const index = parseInt(cypherBlock, 2);
      plain += this.alphabets[index];
    }

    return plain;
  }

  encrypt(plain: string): string {
    let cypher = "";
    for (let i = 0; i < plain.length; i++) {
      cypher += this.alphabetsReverse[plain[i]]
        .toString(2)
        .padStart(this.bitPerAlphabet, "0");
    }

    return cypher;
  }
}

class Shuffler {
  constructor(
    public shuffleTable: number[],
    public shuffleTableReverse: Record<string, number>,
    public initialVector: string,
    public blockSize: number
  ) {}

  xor(str1: string, str2: string): string {
    let ret = "";
    for (let i = 0; i < str1.length; i++) {
      if (str1[i] === str2[i]) ret += "0";
      else ret += "1";
    }

    return ret;
  }

  private encode(block: string) {
    const key = parseInt(block, 2);
    const value = this.shuffleTable[key];
    return value.toString(2).padStart(this.blockSize, "0");
  }

  private decode(block: string) {
    const key = parseInt(block, 2);
    const value = this.shuffleTableReverse[key];
    return value.toString(2).padStart(this.blockSize, "0");
  }

  shuffle(cypherContent: string) {
    const cypherBlocks = split(cypherContent, this.blockSize);
    let prevBlock = this.xor(cypherBlocks[0], this.initialVector);
    prevBlock = this.encode(prevBlock);
    let ret = prevBlock;
    for (let i = 1; i < cypherBlocks.length; i++) {
      prevBlock = this.xor(prevBlock, cypherBlocks[i]);
      prevBlock = this.encode(prevBlock);
      ret += prevBlock;
    }
    return ret;
  }

  deshuffle(cypherAddress: string) {
    let ret = "";
    const cypherBlocks = split(cypherAddress, this.blockSize).reverse();
    let prevBlock = cypherBlocks[0];
    for (let i = 1; i < cypherBlocks.length; i++) {
      prevBlock = this.decode(prevBlock);
      prevBlock = this.xor(cypherBlocks[i], prevBlock);
      ret = prevBlock + ret;
      prevBlock = cypherBlocks[i];
    }
    prevBlock = this.decode(prevBlock);
    prevBlock = this.xor(prevBlock, this.initialVector);
    ret = prevBlock + ret;

    return ret;
  }
}

export class BabelManager {
  private static contentManager = new AlphabetManager(
    babel_alphabets,
    babel_alphabets_reverse,
    14
  );

  private static addressManager = new AlphabetManager(
    base64_alphabets,
    base64_alphabets_reverse,
    6
  );

  private static shuffler = new Shuffler(
    shuffle_table,
    shuffle_table_reverse,
    initial_vector,
    14
  );

  static contentLen = 1500;
  static addressLen = 3500;

  // cypherLen = 17500
  private static encryptCypherContent(cypherContent: string) {
    cypherContent = this.shuffler.deshuffle(cypherContent);
    cypherContent = reverse(cypherContent);
    cypherContent = this.shuffler.shuffle(cypherContent);
    cypherContent = reverse(cypherContent);
    cypherContent = this.shuffler.shuffle(cypherContent);
    cypherContent = reverse(cypherContent);
    cypherContent = this.shuffler.deshuffle(cypherContent);
    return cypherContent;
  }

  private static decryptCypherContent(cypherAddress: string) {
    cypherAddress = this.shuffler.shuffle(cypherAddress);
    cypherAddress = reverse(cypherAddress);
    cypherAddress = this.shuffler.deshuffle(cypherAddress);
    cypherAddress = reverse(cypherAddress);
    cypherAddress = this.shuffler.deshuffle(cypherAddress);
    cypherAddress = reverse(cypherAddress);
    cypherAddress = this.shuffler.shuffle(cypherAddress);
    return cypherAddress;
  }

  static getAddress(plainContent: string) {
    const plainContentWithPad = plainContent.padEnd(this.contentLen, " ");
    const cypherContent = this.contentManager.encrypt(plainContentWithPad);
    const cypherAddress = this.encryptCypherContent(cypherContent);
    const plainAddress = this.addressManager.decrypt(cypherAddress);
    return plainAddress;
  }

  static getContent(plainAddress: string) {
    const plainAddressWithPad = plainAddress.padStart(this.addressLen, "A");
    const cypherAddress = this.addressManager.encrypt(plainAddressWithPad);
    const cypherContent = this.decryptCypherContent(cypherAddress);
    const plainContent = this.contentManager.decrypt(cypherContent);
    return plainContent;
  }
}
