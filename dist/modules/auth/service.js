"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInUser = exports.insertUser = void 0;
const bcrypt_1 = require("bcrypt");
const configs_1 = __importDefault(require("../../configs"));
const apiError_1 = __importDefault(require("../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const jwt_1 = require("../../utils/jwt");
const prisma_1 = __importDefault(require("../../utils/prisma"));
const insertUser = async (data) => {
    const password = await (0, bcrypt_1.hash)(data.password, Number(configs_1.default.bcrypt_salt_round));
    const result = await prisma_1.default.user.create({
        data: {
            ...data,
            password,
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
        },
    });
    return result;
};
exports.insertUser = insertUser;
const signInUser = async (data) => {
    let isPasswordMatched;
    const isUserExist = await prisma_1.default.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist!');
    }
    if (isUserExist.password) {
        isPasswordMatched = await (0, bcrypt_1.compare)(data.password, isUserExist.password);
    }
    if (!isPasswordMatched) {
        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect!');
    }
    const { id: userId, role } = isUserExist;
    // create access token
    const accessToken = (0, jwt_1.createToken)({ userId, role }, configs_1.default.jwt.secret, configs_1.default.jwt.expires_in);
    // create refresh token
    const refreshToken = (0, jwt_1.createToken)({ userId, role }, configs_1.default.jwt.refresh_token, configs_1.default.jwt.refresh_expire_in);
    return {
        accessToken,
        refreshToken,
    };
};
exports.signInUser = signInUser;
