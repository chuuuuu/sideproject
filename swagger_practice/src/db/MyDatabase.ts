// docs: https://github.com/typicode/lowdb/blob/main/examples/README.md

import { Low, JSONFile } from "lowdb";

export type Book = {
  id: string;
  title: string;
  author: string;
};

type Data = {
  books: Book[]; // Expect posts to be an array of strings
};

export class MyDatabase {
  private static db: Low<Data>;
  private static async initDB() {
    const adapter = new JSONFile<Data>("db.json");
    this.db = new Low<Data>(adapter);
    await this.db.read()
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR_assignment
    this.db.data ||= { books: [] }
  }
  static async getDB() {
    if(!this.db){
      await this.initDB();
    }
    return this.db;
  }
}