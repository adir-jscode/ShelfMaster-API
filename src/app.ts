import express, { Application, Request, Response } from "express";
import { bookRouter } from "./app/modules/book/book.routes";
import { errorHandler } from "./app/middlewares/errorHandler";

const app: Application = express();

require("dotenv").config();
app.use(express.json());

app.use("/api/books", bookRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("welcome ShelfMaster API Server");
});

//route not found error
app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "Sorry! Route not found" });
});

app.use(errorHandler);
export default app;
