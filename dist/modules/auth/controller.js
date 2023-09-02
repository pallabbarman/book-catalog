"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = void 0;
const configs_1 = __importDefault(require("../../configs"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const service_1 = require("./service");
exports.createUser = (0, catchAsync_1.default)(async (req, res) => {
    const result = await (0, service_1.insertUser)(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User created successfully!',
        data: result,
    });
});
exports.loginUser = (0, catchAsync_1.default)(async (req, res) => {
    const result = await (0, service_1.signInUser)(req.body);
    const { refreshToken, ...others } = result;
    // set refresh token into cookie
    const cookieOptions = {
        secure: configs_1.default.env === 'production',
        httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User login successfully!',
        data: others,
    });
});
