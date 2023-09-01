"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUser = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const insertUser = async (data) => {
    const result = await prisma_1.default.user.create({
        data,
    });
    return result;
};
exports.insertUser = insertUser;
