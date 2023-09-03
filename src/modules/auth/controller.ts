import envConfig from 'configs';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { IUser } from 'types/user';
import catchAsync from 'utils/catchAsync';
import sendResponse from 'utils/sendResponse';
import { ILoginUserResponse } from './interface';
import { insertUser, signInUser } from './service';

export const createUser = catchAsync(async (req: Request, res: Response) => {
    const result = await insertUser(req.body);

    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User created successfully!',
        data: result,
    });
});

export const loginUser = catchAsync(async (req: Request, res: Response) => {
    const result = await signInUser(req.body);

    const { refreshToken, ...others } = result;

    // set refresh token into cookie
    const cookieOptions = {
        secure: envConfig.env === 'production',
        httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse<ILoginUserResponse>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User login successfully!',
        data: others,
    });
});
