import express, { Application, Request, Response } from "express";
import { errorHandler } from "./app/middlewares/errorHandler";
import routes from "./app/routes";
import connectDB from "./app/config/db";

const app: Application = express();

require("dotenv").config();
app.use(express.json());

app.use(routes);

app.get("/", (req: Request, res: Response) => {
  res.send("welcome ShelfMaster API Server");
});

//route not found error
app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "Sorry! Route not found" });
});

//global error handler
app.use(errorHandler);

connectDB();
export default app;
