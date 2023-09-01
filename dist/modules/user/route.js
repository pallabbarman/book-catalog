"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable object-curly-newline */
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_1 = require("../../types/user");
const controller_1 = require("./controller");
const validation_1 = require("./validation");
const router = (0, express_1.Router)();
router.get('/', (0, auth_1.default)(user_1.USER_ROLE.ADMIN), controller_1.getAllUsers);
router.get('/:id', (0, auth_1.default)(user_1.USER_ROLE.ADMIN), controller_1.getUser);
router.patch('/:id', (0, validateRequest_1.default)(validation_1.updateUserValidation), (0, auth_1.default)(user_1.USER_ROLE.ADMIN), controller_1.updateUser);
router.delete('/:id', (0, auth_1.default)(user_1.USER_ROLE.ADMIN), controller_1.deleteUser);
const userRoutes = router;
exports.default = userRoutes;
