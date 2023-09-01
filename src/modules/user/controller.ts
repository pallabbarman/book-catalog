/* eslint-disable object-curly-newline */
import { User } from '@prisma/client';
import paginationFields from 'constants/pagination';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from 'utils/catchAsync';
import pick from 'utils/pick';
import sendResponse from 'utils/sendResponse';
import { userFilterableFields } from './constant';
import { editUser, findAllUsers, findUser, removeUser } from './service';

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, userFilterableFields);
    const options = pick(req.query, paginationFields);

    const result = await findAllUsers(filters, options);

    sendResponse<User[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Users retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
});

export const getUser = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;

    const result = await findUser(id);

    sendResponse<User>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User retrieved successfully!',
        data: result,
    });
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;

    const result = await editUser(id, req.body);

    sendResponse<User>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User updated successfully!',
        data: result,
    });
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const id = req.params?.id;

    const result = await removeUser(id);

    sendResponse<User>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User deleted successfully!',
        data: result,
    });
});
