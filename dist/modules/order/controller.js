"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrder = exports.getAllOrders = exports.createOrder = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const service_1 = require("./service");
exports.createOrder = (0, catchAsync_1.default)(async (req, res) => {
    const { user } = req;
    const result = await (0, service_1.insertOrder)(req.body, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order created successfully!',
        data: result,
    });
});
exports.getAllOrders = (0, catchAsync_1.default)(async (req, res) => {
    const { user } = req;
    const result = await (0, service_1.findAllOrders)(user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Orders retrieved successfully!',
        data: result,
    });
});
exports.getOrder = (0, catchAsync_1.default)(async (req, res) => {
    const { user } = req;
    const id = req.params?.id;
    const result = await (0, service_1.findOrder)(id, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order retrieved successfully!',
        data: result,
    });
});
