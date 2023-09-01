/* eslint-disable object-curly-newline */
import { Book } from '@prisma/client';
import paginationFields from 'constants/pagination';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from 'utils/catchAsync';
import pick from 'utils/pick';
import sendResponse from 'utils/sendResponse';
import { bookFilterableFields } from './constant';
import { editBook, findAllBooks, findBook, insertBook, removeBook } from './service';

export const createBook = catchAsync(async (req: Request, res: Response) => {
    const result = await insertBook(req.body);

    sendResponse<Book>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book created successfully!',
        data: result,
    });
});

export const getAllBooks = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, bookFilterableFields);
    const options = pick(req.query, paginationFields);

    const result = await findAllBooks(filters, options);

    sendResponse<Book[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Books retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
});

export const getBook = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;

    const result = await findBook(id);

    sendResponse<Book>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book retrieved successfully!',
        data: result,
    });
});

export const updateBook = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;

    const result = await editBook(id, req.body);

    sendResponse<Book>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book updated successfully!',
        data: result,
    });
});

export const deleteBook = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;

    const result = await removeBook(id);

    sendResponse<Book>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book deleted successfully!',
        data: result,
    });
});
