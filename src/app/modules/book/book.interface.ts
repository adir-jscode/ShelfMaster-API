import { Model } from "mongoose";

interface IBook {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

export interface borrowStaticMethods extends Model<IBook> {
  updateStatus(id: string): void;
}

export default IBook;
