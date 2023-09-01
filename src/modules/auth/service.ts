/* eslint-disable import/prefer-default-export */
import { User } from '@prisma/client';
import prisma from 'utils/prisma';

export const insertUser = async (data: User): Promise<User> => {
    const result = await prisma.user.create({
        data,
    });

    return result;
};
