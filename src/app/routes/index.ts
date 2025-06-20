import { Router } from "express";
import bookRouter from "../modules/book/book.routes";

const routes = Router();

routes.use("/api/books", bookRouter);

export default routes;
