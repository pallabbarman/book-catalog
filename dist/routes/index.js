"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route_1 = __importDefault(require("../modules/auth/route"));
const route_2 = __importDefault(require("../modules/book/route"));
const route_3 = __importDefault(require("../modules/category/route"));
const route_4 = __importDefault(require("../modules/order/route"));
const route_5 = __importDefault(require("../modules/profile/route"));
const route_6 = __importDefault(require("../modules/user/route"));
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: route_1.default,
    },
    {
        path: '/users',
        route: route_6.default,
    },
    {
        path: '/categories',
        route: route_3.default,
    },
    {
        path: '/books',
        route: route_2.default,
    },
    {
        path: '/orders',
        route: route_4.default,
    },
    {
        path: '/profile',
        route: route_5.default,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
