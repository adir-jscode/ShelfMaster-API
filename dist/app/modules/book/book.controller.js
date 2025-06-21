"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_model_1 = require("./book.model");
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.create(req.body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createBook = createBook;
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy, sort, limit } = req.query;
        const filterObj = {};
        if (filter && typeof filter === "string") {
            filterObj.genre = filter;
        }
        const sortObj = {};
        if (sortBy && typeof sortBy === "string") {
            const sortOrder = sort === "desc" ? -1 : 1;
            sortObj[sortBy] = sortOrder;
        }
        const parsedLimit = Number(limit) || 0;
        const books = yield book_model_1.Book.find(filterObj).sort(sortObj).limit(parsedLimit);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllBooks = getAllBooks;
const getBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        console.log(id);
        const bookbyId = yield book_model_1.Book.findById(id);
        console.log(bookbyId);
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: bookbyId,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getBookById = getBookById;
//PUT
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const payload = req.body;
        const updatedBook = yield book_model_1.Book.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateBook = updateBook;
//delete
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        yield book_model_1.Book.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteBook = deleteBook;
