"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../types/user");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.post('/create-order', (0, auth_1.default)(user_1.USER_ROLE.CUSTOMER), controller_1.createOrder);
router.get('/', (0, auth_1.default)(user_1.USER_ROLE.CUSTOMER, user_1.USER_ROLE.ADMIN), controller_1.getAllOrders);
router.get('/:id', (0, auth_1.default)(user_1.USER_ROLE.CUSTOMER, user_1.USER_ROLE.ADMIN), controller_1.getOrder);
const orderRoutes = router;
exports.default = orderRoutes;
