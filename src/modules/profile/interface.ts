import { User } from '@prisma/client';

export type IProfile = Omit<User, 'password'>;
