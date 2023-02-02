import { client } from "./index.js";

export async function getBooks(req) {
  return await client.db("books-shelf").collection("books").find(req.query).toArray();
}

export async function getBookByID(id) {
  return await client.db("books-shelf").collection("books").findOne({ id: id });
}

export async function deleteByID(id) {
  return await client.db("books-shelf").collection("books").deleteOne({ id: id });
}

export async function AddBook(newBook) {
  return await client.db("books-shelf").collection("books").insertOne(newBook);
}

export async function EditBook(id, updatedBook) {
  return await client
    .db("books-shelf")
    .collection("books")
    .updateOne({ id: id }, { $set: updatedBook });
}
