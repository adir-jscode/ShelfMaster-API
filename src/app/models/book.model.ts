import { Schema } from "mongoose";
import IBook from "../interfaces/book.interface";

const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
});
