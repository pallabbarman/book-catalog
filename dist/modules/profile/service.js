"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findProfile = void 0;
/* eslint-disable import/prefer-default-export */
const apiError_1 = __importDefault(require("../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../types/user");
const prisma_1 = __importDefault(require("../../utils/prisma"));
const findProfile = async (user) => {
    const userId = user?.userId;
    const role = user?.role;
    let result;
    if (role === user_1.USER_ROLE.ADMIN) {
        result = await prisma_1.default.user.findUnique({
            where: {
                id: userId,
            },
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
                orders: true,
            },
        });
        return result;
    }
    if (role === user_1.USER_ROLE.CUSTOMER) {
        result = await prisma_1.default.user.findUnique({
            where: {
                id: userId,
            },
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
                orders: true,
            },
        });
        return result;
    }
    throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Profile not found!');
};
exports.findProfile = findProfile;
