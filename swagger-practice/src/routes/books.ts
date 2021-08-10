import express from "express";
import { nanoid } from "nanoid";
import { Book, MyDatabase } from "../db/MyDatabase";

export const getBooksRouter = async () => {
  const db = await MyDatabase.getDB();
  const router = express.Router();
  const idLength = 8;

  /**
   * @swagger
   * components:
   *   schemas:
   *     Book:
   *       type: object
   *       required:
   *         - title
   *         - author
   *       properties:
   *         id:
   *           type: string
   *           description: The auto-generated id of the book
   *         title:
   *           type: string
   *           description: The book title
   *         author:
   *           type: string
   *           description: The book author
   *       example:
   *         id: d5fE_asz
   *         title: The New Turing Omnibus
   *         author: Alexander K. Dewdney
   */

  /**
   * @swagger
   * tags:
   *   name: Books
   *   description: The books managing API
   */

  /**
   * @swagger
   * /books:
   *   get:
   *     summary: Returns the list of all the books
   *     tags: [Books]
   *     responses:
   *       200:
   *         description: The list of the books
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Book'
   */

  router.get("/", (_req, res) => {
    const books = db.data?.books;
    res.send(books);
  });

  /**
   * @swagger
   * /books/{id}:
   *   get:
   *     summary: Get the book by id
   *     tags: [Books]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The book id
   *     responses:
   *       200:
   *         description: The book description by id
   *         contens:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Book'
   *       404:
   *         description: The book was not found
   */

  router.get("/:id", (req, res) => {
    const book = db.data?.books.find((book) => book.id === req.params.id);

    if (!book) {
      res.sendStatus(404);
    }

    res.send(book);
  });

  /**
   * @swagger
   * /books:
   *   post:
   *     summary: Create a new book
   *     tags: [Books]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Book'
   *     responses:
   *       200:
   *         description: The book was successfully created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Book'
   *       500:
   *         description: Some server error
   */

  router.post("/", async (req, res) => {
    try {
      const book: Book = {
        id: nanoid(idLength),
        ...req.body,
      };

      db.data?.books.push(book);
      await db.write();

      res.send(book);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  /**
   * @swagger
   * /books/{id}:
   *  put:
   *    summary: Update the book by the id
   *    tags: [Books]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: The book id
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/Book'
   *    responses:
   *      200:
   *        description: The book was updated
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Book'
   *      404:
   *        description: The book was not found
   *      500:
   *        description: Some error happened
   */

  router.put("/:id", async (req, res) => {
    try {
      const book = db.data?.books.find((book) => book.id === req.params.id);
      const newBook: Book = {
        ...book,
        ...req.body,
      };

      const index = db.data?.books.findIndex((book) => book.id === req.params.id);
      if(index === undefined){
        res.sendStatus(404);
        return;
      }
      db.data?.books.splice(index, 1);
      db.data?.books.push(newBook);
      await db.write();
      
      res.send(newBook);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  /**
   * @swagger
   * /books/{id}:
   *   delete:
   *     summary: Remove the book by id
   *     tags: [Books]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: The book id
   *
   *     responses:
   *       200:
   *         description: The book was deleted
   *       404:
   *         description: The book was not found
   */

  router.delete("/:id", async (req, res) => {
    try {
      const index = db.data?.books.findIndex(
        (book) => book.id === req.params.id
      );
      if (index === undefined) {
        res.sendStatus(404);
        return;
      }
      db.data?.books.splice(index, 1);
      await db.write();
      res.sendStatus(200);
    } catch (error) {
      res.status(500).send(error);
    }
  });

	return router;
};
