import express, { Application, Request, Response } from "express";
import { errorHandler } from "./app/middlewares/errorHandler";
import routes from "./app/routes";

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

app.use(errorHandler);
export default app;
