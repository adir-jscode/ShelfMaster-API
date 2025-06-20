import { model, Model, Schema } from "mongoose";
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
    if (!availableBook) {
      return next(new Error("Book not found"));
    }
    if (this.quantity > availableBook.copies) {
      return next(new Error("Not enough copies available"));
    }
    next();
  } catch (error: any) {
    next(error);
  }
});

borrowSchema.post("save", async function (doc) {
  try {
    const book = await Book.findById(doc.book);
    if (book) {
      book.copies -= doc.quantity;
      await book.save();
      if (book.copies === 0) {
        await Book.updateStatus(doc.book.toString());
      }
    }
  } catch (error) {
    console.error("Error updating book copies after borrow:", error);
  }
});

const Borrow = model("Borrow", borrowSchema);
export default Borrow;
