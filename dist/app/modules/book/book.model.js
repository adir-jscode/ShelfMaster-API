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
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        trim: true,
    },
    author: {
        type: String,
        required: [true, "author is required"],
        trim: true,
    },
    genre: {
        type: String,
        required: [true, "genre is required"],
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
        required: [true, "isbn is required"],
        unique: true,
    },
    description: {
        type: String,
        default: "",
    },
    copies: {
        type: Number,
        required: [true, "copies is required"],
        min: [0, "Copies must be a positive number"],
    },
    available: {
        type: Boolean,
        default: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});
bookSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.copies === 0) {
            return false;
        }
        else {
            return true;
        }
    });
});
bookSchema.static("updateStatus", function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield exports.Book.findById(id);
        if ((book === null || book === void 0 ? void 0 : book.copies) === 0) {
            book.available = false;
            yield book.save();
        }
    });
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
