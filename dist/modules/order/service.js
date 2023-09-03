"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOrder = exports.findAllOrders = exports.insertOrder = void 0;
const apiError_1 = __importDefault(require("../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../types/user");
const prisma_1 = __importDefault(require("../../utils/prisma"));
const insertOrder = async (data, user) => {
    const userId = user?.userId;
    const result = await prisma_1.default.order.create({
        data: { userId, ...data },
        select: {
            id: true,
            userId: true,
            orderedBooks: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    contactNo: true,
                    address: true,
                    profileImg: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
        },
    });
    return result;
};
exports.insertOrder = insertOrder;
const findAllOrders = async (user) => {
    const userId = user?.userId;
    const role = user?.role;
    let result = [];
    if (role === user_1.USER_ROLE.ADMIN) {
        result = await prisma_1.default.order.findMany({
            select: {
                id: true,
                userId: true,
                orderedBooks: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        contactNo: true,
                        address: true,
                        profileImg: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });
        return result;
    }
    if (role === user_1.USER_ROLE.CUSTOMER) {
        result = await prisma_1.default.order.findMany({
            where: {
                userId,
            },
            select: {
                id: true,
                userId: true,
                orderedBooks: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        contactNo: true,
                        address: true,
                        profileImg: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });
        return result;
    }
    throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'User not matched!');
};
exports.findAllOrders = findAllOrders;
const findOrder = async (id, user) => {
    const userId = user?.userId;
    const role = user?.role;
    let result;
    if (role === user_1.USER_ROLE.ADMIN) {
        result = await prisma_1.default.order.findUnique({
            where: {
                userId,
                id,
            },
            select: {
                id: true,
                userId: true,
                orderedBooks: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        contactNo: true,
                        address: true,
                        profileImg: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });
        return result;
    }
    if (role === user_1.USER_ROLE.CUSTOMER) {
        result = await prisma_1.default.order.findUnique({
            where: {
                userId,
                id,
            },
            select: {
                id: true,
                userId: true,
                orderedBooks: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        contactNo: true,
                        address: true,
                        profileImg: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });
        return result;
    }
    throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'User not matched!');
};
exports.findOrder = findOrder;
