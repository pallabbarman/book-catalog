"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.userValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userValidation = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string({
            required_error: 'Name is required!',
        }),
        email: zod_1.default
            .string({
            required_error: 'Email is required!',
        })
            .email({ message: 'Please enter a valid email!' }),
        password: zod_1.default.string({
            required_error: 'Password is required!',
        }),
        role: zod_1.default.string({
            required_error: 'Role is required!',
        }),
        contactNo: zod_1.default.string({
            required_error: 'Contact number is required!',
        }),
        address: zod_1.default.string({
            required_error: 'Address is required!',
        }),
        profileImg: zod_1.default.string({
            required_error: 'Profile image is required!',
        }),
    }),
});
exports.loginValidation = zod_1.default.object({
    body: zod_1.default.object({
        email: zod_1.default
            .string({
            required_error: 'Email is required!',
        })
            .email({ message: 'Please enter a valid email!' }),
        password: zod_1.default.string({
            required_error: 'Password is required!',
        }),
    }),
});
