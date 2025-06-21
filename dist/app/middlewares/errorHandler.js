"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res) => {
    if (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error,
        });
    }
    res.status(500).json({
        message: error.message || "Internal server error",
        success: false,
        error: error,
    });
};
exports.errorHandler = errorHandler;
