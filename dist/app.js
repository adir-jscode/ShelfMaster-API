"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./app/routes"));
const db_1 = __importDefault(require("./app/config/db"));
const errorHandler_1 = require("./app/middlewares/errorHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(routes_1.default);
app.get("/", (req, res) => {
    res.send("welcome ShelfMaster API Server");
});
//route not found error
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Sorry! Route not found" });
});
//global error handler
app.use((err, req, res, next) => {
    (0, errorHandler_1.errorHandler)(err, req, res, next);
});
(0, db_1.default)();
exports.default = app;
