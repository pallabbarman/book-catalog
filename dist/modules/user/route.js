"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable object-curly-newline */
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const controller_1 = require("./controller");
const validation_1 = require("./validation");
const router = (0, express_1.Router)();
router.get('/', controller_1.getAllUsers);
router.get('/:id', controller_1.getUser);
router.patch('/:id', (0, validateRequest_1.default)(validation_1.updateUserValidation), controller_1.updateUser);
router.delete('/:id', controller_1.deleteUser);
const userRoutes = router;
exports.default = userRoutes;
