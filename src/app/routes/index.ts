import { Router } from "express";
import bookRouter from "../modules/book/book.routes";
import borrowRouter from "../modules/borrow/borrow.routes";

const routes = Router();

routes.use("/api/books", bookRouter);
routes.use("/api/borrow", borrowRouter);

export default routes;
