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
        select: {
            id: true,
            userId: true,
            orderedBooks: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    contactNo: true,
                    address: true,
                    profileImg: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
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
            select: {
                id: true,
                userId: true,
                orderedBooks: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        contactNo: true,
                        address: true,
                        profileImg: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });
        return result;
    }
    if (role === USER_ROLE.CUSTOMER) {
        result = await prisma.order.findMany({
            where: {
                userId,
            },
            select: {
                id: true,
                userId: true,
                orderedBooks: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        contactNo: true,
                        address: true,
                        profileImg: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
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
            select: {
                id: true,
                userId: true,
                orderedBooks: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        contactNo: true,
                        address: true,
                        profileImg: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
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
            select: {
                id: true,
                userId: true,
                orderedBooks: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        contactNo: true,
                        address: true,
                        profileImg: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });
        return result;
    }

    throw new ApiError(httpStatus.BAD_REQUEST, 'User not matched!');
};
