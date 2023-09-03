/* eslint-disable import/prefer-default-export */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from 'utils/catchAsync';
import sendResponse from 'utils/sendResponse';
import { IProfile } from './interface';
import { findProfile } from './service';

export const getProfile = catchAsync(async (req: Request, res: Response) => {
    const { user } = req;

    const result = await findProfile(user);

    sendResponse<IProfile>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Profile retrieved successfully!',
        data: result,
    });
});
