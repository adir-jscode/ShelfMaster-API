"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const mongoose_1 = __importStar(require("mongoose"));
const book_model_1 = require("../book/book.model");
const borrowSchema = new mongoose_1.Schema({
    book: { type: mongoose_1.Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: {
        type: Number,
        required: true,
        min: [1, "you have to borrow atleast 1 book"],
    },
    dueDate: { type: Date, required: true },
}, { timestamps: true, versionKey: false });
borrowSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bookId = this.book;
            const availableBook = yield book_model_1.Book.findById(bookId);
            if (availableBook) {
                if (this.quantity > availableBook.copies) {
                    const err = new mongoose_1.default.Error.ValidationError();
                    err.addError("quantity", new mongoose_1.default.Error.ValidatorError({
                        message: "Not enough copies available",
                        path: "quantity",
                        value: this.quantity,
                    }));
                    return next(err);
                }
                next();
            }
        }
        catch (error) {
            if (error instanceof Error) {
                next(error);
            }
            else {
                next(new Error("Unknown error occurred"));
            }
        }
    });
});
borrowSchema.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const book = yield book_model_1.Book.findById(doc.book);
            if (book) {
                book.copies -= doc.quantity;
                yield book.save();
                if (book.copies === 0) {
                    yield book_model_1.Book.updateStatus(doc.book.toString());
                }
            }
        }
        catch (error) {
            if (error instanceof Error) {
                next(error);
            }
            else {
                next(new Error("Unknown error occurred"));
            }
        }
    });
});
const Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
exports.default = Borrow;
