/* eslint-disable import/prefer-default-export */
/* eslint-disable no-shadow */
import { User } from '@prisma/client';

export enum USER_ROLE {
    ADMIN = 'admin',
    CUSTOMER = 'customer',
}

export type IUser = Omit<User, 'password'>;
