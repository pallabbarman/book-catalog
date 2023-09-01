"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidation = void 0;
/* eslint-disable import/prefer-default-export */
const zod_1 = __importDefault(require("zod"));
exports.updateUserValidation = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string().optional(),
        email: zod_1.default.string().email().optional(),
        password: zod_1.default.string().optional(),
        role: zod_1.default.string().optional(),
        contactNo: zod_1.default.string().optional(),
        address: zod_1.default.string().optional(),
        profileImg: zod_1.default.string().optional(),
    }),
});
