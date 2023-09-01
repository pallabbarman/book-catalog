"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route_1 = __importDefault(require("../modules/auth/route"));
const route_2 = __importDefault(require("../modules/category/route"));
const route_3 = __importDefault(require("../modules/user/route"));
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: route_1.default,
    },
    {
        path: '/users',
        route: route_3.default,
    },
    {
        path: '/categories',
        route: route_2.default,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
