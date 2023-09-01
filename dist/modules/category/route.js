"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const controller_1 = require("./controller");
const validation_1 = require("./validation");
const router = (0, express_1.Router)();
router.post('/create-category', (0, validateRequest_1.default)(validation_1.CategoryValidation), controller_1.createCategory);
router.get('/', controller_1.getAllCategories);
router.get('/:id', controller_1.getCategory);
router.patch('/:id', (0, validateRequest_1.default)(validation_1.updateCategoryValidation), controller_1.updateCategory);
router.delete('/:id', controller_1.deleteCategory);
const categoryRoutes = router;
exports.default = categoryRoutes;
