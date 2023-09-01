"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookValidation = exports.bookValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.bookValidation = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string({
            required_error: 'Title is required!',
        }),
        author: zod_1.default.string({
            required_error: 'Author is required!',
        }),
        price: zod_1.default.number({
            required_error: 'Price is required!',
        }),
        genre: zod_1.default.string({
            required_error: 'Genre is required!',
        }),
        publicationDate: zod_1.default.string({
            required_error: 'Publication date is required!',
        }),
        categoryId: zod_1.default.string({
            required_error: 'Category id is required!',
        }),
    }),
});
exports.updateBookValidation = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string().optional(),
        author: zod_1.default.string().optional(),
        price: zod_1.default.number().optional(),
        genre: zod_1.default.string().optional(),
        publicationDate: zod_1.default.string().optional(),
        categoryId: zod_1.default.string().optional(),
    }),
});
