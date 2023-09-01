import { Category } from '@prisma/client';
import paginationFields from 'constants/pagination';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from 'utils/catchAsync';
import pick from 'utils/pick';
import sendResponse from 'utils/sendResponse';
import { categoryFilterableFields } from './constant';
import {
    editCategory,
    findAllCategories,
    findCategory,
    insertCategory,
    removeCategory,
} from './service';

export const createCategory = catchAsync(async (req: Request, res: Response) => {
    const result = await insertCategory(req.body);

    sendResponse<Category>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category created successfully!',
        data: result,
    });
});

export const getAllCategories = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, categoryFilterableFields);
    const options = pick(req.query, paginationFields);

    const result = await findAllCategories(filters, options);

    sendResponse<Category[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Categories retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
});

export const getCategory = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;

    const result = await findCategory(id);

    sendResponse<Category>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category retrieved successfully!',
        data: result,
    });
});

export const updateCategory = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;

    const result = await editCategory(id, req.body);

    sendResponse<Category>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category updated successfully!',
        data: result,
    });
});

export const deleteCategory = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;

    const result = await removeCategory(id);

    sendResponse<Category>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Category deleted successfully!',
        data: result,
    });
});
