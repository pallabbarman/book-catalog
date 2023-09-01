import { User } from '@prisma/client';

export interface IUserFilter {
    search?: string;
}

export type IUser = Omit<User, 'password'>;
