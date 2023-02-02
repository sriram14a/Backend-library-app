import * as dotenv from "dotenv";
import express from "express";
import { MongoClient } from "mongodb";
import { bookRouter } from "./routes/book.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  try{const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo is connected");
    return client;
  }
  catch{
    console.log("Mongo is not connected");
  }
}

export const client = await createConnection();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to library");
});

app.use("/books", bookRouter);

app.listen(PORT, () => console.log("Server listening to PORT", PORT));

