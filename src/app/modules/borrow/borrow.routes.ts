import { Router } from "express";
import { borrowController } from "./borrow.controller";

const borrowRouter = Router();

borrowRouter.post("/", borrowController.borrowBook);
borrowRouter.get("/", borrowController.getBorrowedBooks);

export default borrowRouter;
