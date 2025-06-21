import mongoose, { model, Schema } from "mongoose";
import { IBorrow } from "./borrow.interface";
import { Book } from "../book/book.model";

const borrowSchema = new Schema<IBorrow>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: {
      type: Number,
      required: true,
      min: [1, "you have to borrow atleast 1 book"],
    },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false }
);

borrowSchema.pre("save", async function (next) {
  try {
    const bookId = this.book;
    const availableBook = await Book.findById(bookId);
    if (availableBook) {
      if (this.quantity > availableBook.copies) {
        const err = new mongoose.Error.ValidationError();
        err.addError(
          "quantity",
          new mongoose.Error.ValidatorError({
            message: "Not enough copies available",
            path: "quantity",
            value: this.quantity,
          })
        );
        return next(err);
      }
      next();
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(error);
    } else {
      next(new Error("Unknown error occurred"));
    }
  }
});

borrowSchema.post("save", async function (doc, next) {
  try {
    const book = await Book.findById(doc.book);
    if (book) {
      book.copies -= doc.quantity;
      await book.save();
      if (book.copies === 0) {
        await Book.updateStatus(doc.book.toString());
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(error);
    } else {
      next(new Error("Unknown error occurred"));
    }
  }
});

const Borrow = model("Borrow", borrowSchema);
export default Borrow;
