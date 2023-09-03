import { Order } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from 'utils/catchAsync';
import sendResponse from 'utils/sendResponse';
import { findAllOrders, findOrder, insertOrder } from './service';

export const createOrder = catchAsync(async (req: Request, res: Response) => {
    const { user } = req;
    const result = await insertOrder(req.body, user);

    sendResponse<Order>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order created successfully!',
        data: result,
    });
});

export const getAllOrders = catchAsync(async (req: Request, res: Response) => {
    const { user } = req;
    const result = await findAllOrders(user);

    sendResponse<Order[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Orders retrieved successfully!',
        data: result,
    });
});

export const getOrder = catchAsync(async (req: Request, res: Response) => {
    const { user } = req;
    const id = req.params?.id;
    const result = await findOrder(id, user);

    sendResponse<Order>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order retrieved successfully!',
        data: result,
    });
});
