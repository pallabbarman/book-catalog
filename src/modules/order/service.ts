/* eslint-disable import/prefer-default-export */
import { Order } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
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
