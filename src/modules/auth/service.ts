/* eslint-disable comma-dangle */
import { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import envConfig from 'configs';
import ApiError from 'errors/apiError';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import { createToken } from 'utils/jwt';
import prisma from 'utils/prisma';
import { ILoginUser, ILoginUserResponse } from './interface';

export const insertUser = async (data: User): Promise<User> => {
    const password = await hash(data.password, Number(envConfig.bcrypt_salt_round));
    const result = await prisma.user.create({
        data: {
            ...data,
            password,
        },
    });

    return result;
};

export const signInUser = async (data: ILoginUser): Promise<ILoginUserResponse> => {
    let isPasswordMatched;
    const isUserExist = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
    }

    if (isUserExist.password) {
        isPasswordMatched = await compare(data.password, isUserExist.password);
    }

    if (!isPasswordMatched) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect!');
    }

    const { id: userId, role } = isUserExist;

    // create access token
    const accessToken = createToken(
        { userId, role },
        envConfig.jwt.secret as Secret,
        envConfig.jwt.expires_in as string
    );

    // create refresh token
    const refreshToken = createToken(
        { userId, role },
        envConfig.jwt.refresh_token as Secret,
        envConfig.jwt.refresh_expire_in as string
    );

    return {
        accessToken,
        refreshToken,
    };
};
