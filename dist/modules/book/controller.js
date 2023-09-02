"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooksByCategoryId = exports.deleteBook = exports.updateBook = exports.getBook = exports.getAllBooks = exports.createBook = void 0;
const pagination_1 = __importDefault(require("../../constants/pagination"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const pick_1 = __importDefault(require("../../utils/pick"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const constant_1 = require("./constant");
const service_1 = require("./service");
exports.createBook = (0, catchAsync_1.default)(async (req, res) => {
    const result = await (0, service_1.insertBook)(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book created successfully!',
        data: result,
    });
});
exports.getAllBooks = (0, catchAsync_1.default)(async (req, res) => {
    const filters = (0, pick_1.default)(req.query, constant_1.bookFilterableFields);
    const options = (0, pick_1.default)(req.query, pagination_1.default);
    const result = await (0, service_1.findAllBooks)(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Books retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
});
exports.getBook = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params?.id;
    const result = await (0, service_1.findBook)(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book retrieved successfully!',
        data: result,
    });
});
exports.updateBook = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params?.id;
    const result = await (0, service_1.editBook)(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book updated successfully!',
        data: result,
    });
});
exports.deleteBook = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params?.id;
    const result = await (0, service_1.removeBook)(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book deleted successfully!',
        data: result,
    });
});
exports.getBooksByCategoryId = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params?.id;
    const options = (0, pick_1.default)(req.query, pagination_1.default);
    const result = await (0, service_1.findBooksByCategoryId)(id, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Books with associated category data fetched successfully!',
        meta: result.meta,
        data: result.data,
    });
});
