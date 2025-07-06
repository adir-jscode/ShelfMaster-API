import express, { Application, Request, Response } from "express";
import routes from "./app/routes";
import connectDB from "./app/config/db";
import { errorHandler } from "./app/middlewares/errorHandler";
import cors from "cors";

const app: Application = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://shelfmaster-redux.vercel.app"],
    credentials: true, // optional but useful for cookies
  })
);

app.use(express.json());

app.use(routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to 📚ShelfMaster API");
});

//route not found error
app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "Sorry! Route not found" });
});

//global error handler
app.use((err: any, req: Request, res: Response, next: express.NextFunction) => {
  errorHandler(err, req, res, next);
});

connectDB();
export default app;
