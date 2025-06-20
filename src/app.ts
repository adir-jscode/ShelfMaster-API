import express, { Application, Request, Response } from "express";
import { bookRouter } from "./app/routes/book.routes";
const app: Application = express();

require("dotenv").config();
app.use(express.json());

app.use("/api/books", bookRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("welcome ShelfMaster API Server");
});

export default app;
