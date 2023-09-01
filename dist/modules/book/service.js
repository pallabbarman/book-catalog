"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeBook = exports.editBook = exports.findBook = exports.findAllBooks = exports.insertBook = void 0;
const pagination_1 = __importDefault(require("../../utils/pagination"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const constant_1 = require("./constant");
const insertBook = async (data) => {
    const result = await prisma_1.default.book.create({
        data,
        include: {
            category: true,
            reviewsAndRatings: true,
        },
    });
    return result;
};
exports.insertBook = insertBook;
const findAllBooks = async (filters, options) => {
    const { search, ...filterData } = filters;
    const { limit, page, skip, sortBy, sortOrder } = (0, pagination_1.default)(options);
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: constant_1.bookSearchableFields.map((field) => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = await prisma_1.default.book.findMany({
        where: whereConditions,
        include: {
            category: true,
            reviewsAndRatings: true,
        },
        skip,
        take: limit,
        orderBy: sortBy && sortOrder
            ? { [sortBy]: sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    const total = await prisma_1.default.book.count({
        where: whereConditions,
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};
exports.findAllBooks = findAllBooks;
const findBook = async (id) => {
    const result = await prisma_1.default.book.findUnique({
        where: {
            id,
        },
        include: {
            category: true,
            reviewsAndRatings: true,
        },
    });
    return result;
};
exports.findBook = findBook;
const editBook = async (id, payload) => {
    const result = await prisma_1.default.book.update({
        where: {
            id,
        },
        include: {
            category: true,
            reviewsAndRatings: true,
        },
        data: payload,
    });
    return result;
};
exports.editBook = editBook;
const removeBook = async (id) => {
    const result = await prisma_1.default.book.delete({
        where: {
            id,
        },
    });
    return result;
};
exports.removeBook = removeBook;
