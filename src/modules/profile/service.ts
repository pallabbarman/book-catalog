/* eslint-disable import/prefer-default-export */
import ApiError from 'errors/apiError';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { USER_ROLE } from 'types/user';
import prisma from 'utils/prisma';
import { IProfile } from './interface';

export const findProfile = async (user: JwtPayload): Promise<IProfile | null> => {
    const userId = user?.userId;
    const role = user?.role;

    let result;

    if (role === USER_ROLE.ADMIN) {
        result = await prisma.user.findUnique({
            where: {
                id: userId,
            },
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
                orders: true,
            },
        });

        return result;
    }

    if (role === USER_ROLE.CUSTOMER) {
        result = await prisma.user.findUnique({
            where: {
                id: userId,
            },
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
                orders: true,
            },
        });

        return result;
    }

    throw new ApiError(httpStatus.BAD_REQUEST, 'Profile not found!');
};
