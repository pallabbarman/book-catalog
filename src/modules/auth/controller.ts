/* eslint-disable import/prefer-default-export */
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from 'utils/catchAsync';
import sendResponse from 'utils/sendResponse';
import { insertUser } from './service';

export const createUser = catchAsync(async (req: Request, res: Response) => {
    const result = await insertUser(req.body);

    sendResponse<User>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User created successfully!',
        data: result,
    });
});
