/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */
import { Order } from '@prisma/client';
import ApiError from 'errors/apiError';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { USER_ROLE } from 'types/user';
import prisma from 'utils/prisma';

export const insertOrder = async (data: Order[], user: JwtPayload): Promise<Order> => {
    const userId = user?.userId;

    const result = await prisma.order.create({
        data: { userId, ...data },
        include: {
            user: true,
        },
    });

    return result;
};

export const findAllOrders = async (user: JwtPayload): Promise<Order[] | undefined> => {
    const userId = user?.userId;
    const role = user?.role;
    let result: Order[] = [];
    if (role === USER_ROLE.ADMIN) {
        result = await prisma.order.findMany({
            include: {
                user: true,
            },
        });
        return result;
    }
    if (role === USER_ROLE.CUSTOMER) {
        result = await prisma.order.findMany({
            where: {
                userId,
            },
            include: {
                user: true,
            },
        });
        return result;
    }

    throw new ApiError(httpStatus.BAD_REQUEST, 'User not matched!');
};

export const findOrder = async (
    id: string,
    user: JwtPayload
): Promise<Order | undefined | null> => {
    const userId = user?.userId;
    const role = user?.role;
    let result;
    if (role === USER_ROLE.ADMIN) {
        result = await prisma.order.findUnique({
            where: {
                userId,
                id,
            },
            include: {
                user: true,
            },
        });
        return result;
    }
    if (role === USER_ROLE.CUSTOMER) {
        result = await prisma.order.findUnique({
            where: {
                userId,
                id,
            },
            include: {
                user: true,
            },
        });
        return result;
    }

    throw new ApiError(httpStatus.BAD_REQUEST, 'User not matched!');
};
