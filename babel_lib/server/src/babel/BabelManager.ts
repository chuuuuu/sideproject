import { readFileSync } from "fs";

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
    public blockSize: number
  ) {}

  shuffle(cypherContent: string) {
    let ret = "";
    const cypherBlocks = split(cypherContent, this.blockSize);
    let prevBlock = cypherBlocks[0];
    for (let i = 1; i < cypherBlocks.length; i++) {
      const currentBlock = cypherBlocks[i];
      const key = parseInt(prevBlock + currentBlock, 2);
      const value = this.shuffleTable[key];
      const blocksAfterShuffle = value
        .toString(2)
        .padStart(this.blockSize * 2, "0");
      const [firstBlock, secondBlock] = split(
        blocksAfterShuffle,
        this.blockSize
      );
      ret += firstBlock;
      prevBlock = secondBlock;
    }
    ret += prevBlock;

    return ret;
  }

  deshuffle(cypherAddress: string) {
    let ret = "";
    const cypherBlocks = split(cypherAddress, this.blockSize).reverse();
    let prevBlock = cypherBlocks[0];
    for (let i = 1; i < cypherBlocks.length; i++) {
      const currentBlock = cypherBlocks[i];
      const key = parseInt(currentBlock + prevBlock, 2);
      const value = this.shuffleTableReverse[key];
      const blocksAfterShuffle = value
        .toString(2)
        .padStart(this.blockSize * 2, "0");
      const [firstBlock, secondBlock] = split(
        blocksAfterShuffle,
        this.blockSize
      );
      ret = secondBlock + ret;
      prevBlock = firstBlock;
    }
    ret = prevBlock + ret;

    return ret;
  }
}

export class BabelManager {
  static contentManager = new AlphabetManager(
    JSON.parse(readFileSync(__dirname + "/../db/babel_alphabets.json", "utf8")),
    JSON.parse(
      readFileSync(__dirname + "/../db/babel_alphabets_reverse.json", "utf8")
    ),
    14
  );

  static addressManager = new AlphabetManager(
    JSON.parse(
      readFileSync(__dirname + "/../db/base64_alphabets.json", "utf8")
    ),
    JSON.parse(
      readFileSync(__dirname + "/../db/base64_alphabets_reverse.json", "utf8")
    ),
    5
  );

  static shuffler = new Shuffler(
    JSON.parse(readFileSync(__dirname + "/../db/shuffle_table.json", "utf8")),
    JSON.parse(
      readFileSync(__dirname + "/../db/shuffle_table_reverse.json", "utf8")
    ),
    6
  );

  static articleLen = 1500;
  static addressLen = 3500;

  // cypherLen = 21000
  static encryptCypherContent(cypherContent: string) {
    cypherContent = reverse(this.shuffler.shuffle(cypherContent));
    return this.shuffler.shuffle(cypherContent);
  }

  static decryptCypherContent(cypherAddress: string) {
    cypherAddress = reverse(this.shuffler.deshuffle(cypherAddress));
    return this.shuffler.deshuffle(cypherAddress);
  }

  static getAddress(plainContent: string) {
    const plainContentWithPad = plainContent.padEnd(this.articleLen, "0");
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
