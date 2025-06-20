import express, { Application, Request, Response } from "express";
import { bookRouter } from "./app/modules/book/book.routes";
import { errorHandler } from "./app/middlewares/errorHandler";

const app: Application = express();

require("dotenv").config();
app.use(express.json());

app.use("/api/books", bookRouter);

// app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("welcome ShelfMaster API Server");
});

app.use(errorHandler);
export default app;
