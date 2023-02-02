import express from "express";
import {
  getBooks,
  getBookByID,
  deleteByID,
  AddBook,
  EditBook,
} from "../bookController.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const book = await getBooks(req);
  res.send(book);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const book = await getBookByID(id);
  book ? res.send(book) : res.status(404).send({ message: "No book found" });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const book = await deleteByID(id);
  book ? res.send(book) : res.status(404).send({ message: "No book found" });
});

router.post("/", async (req, res) => {
  try {
    const newBook = req.body;
    await AddBook(newBook);
    res.status(200).json({ message: "successfully inserted", data: newBook });
  } catch {
    res.status(404).json({ message: "failed to insert" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedBook = req.body;
  await EditBook(id, updatedBook);
  try{
  res.status(200).json({ message: "successfully updated", data: updatedBook });
  } catch {
    res.status(404).json({ message: "failed to update" });
  }
});

export const bookRouter = router;
