import { Model, model, Schema } from "mongoose";
import IBook, { borrowStaticMethods } from "./book.interface";

const bookSchema = new Schema<IBook, borrowStaticMethods>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a positive number"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

bookSchema.pre("save", async function (next) {
  if (this.copies === 0) {
    return false;
  } else {
    return true;
  }
});
bookSchema.static("updateStatus", async function (id) {
  const book = await Book.findById(id);
  if (book?.copies === 0) {
    book.available = false;
    await book.save();
  }
});
export const Book = model<IBook, borrowStaticMethods>("Book", bookSchema);
