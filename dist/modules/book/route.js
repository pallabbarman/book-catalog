"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable object-curly-newline */
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const controller_1 = require("./controller");
const validation_1 = require("./validation");
const router = (0, express_1.Router)();
router.post('/create-book', (0, validateRequest_1.default)(validation_1.bookValidation), controller_1.createBook);
router.get('/', controller_1.getAllBooks);
router.get('/:id', controller_1.getBook);
router.patch('/:id', (0, validateRequest_1.default)(validation_1.updateBookValidation), controller_1.updateBook);
router.delete('/:id', controller_1.deleteBook);
const bookRoutes = router;
exports.default = bookRoutes;
