/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import { Book, Prisma } from '@prisma/client';
import { IPaginationOptions } from 'types/pagination';
import { IGenericResponse } from 'types/response';
import calculatePagination from 'utils/pagination';
import prisma from 'utils/prisma';
import { bookSearchableFields } from './constant';
import { IBookFilters } from './interface';

export const insertBook = async (data: Book): Promise<Book> => {
    const result = await prisma.book.create({
        data,
        include: {
            category: true,
            reviewsAndRatings: true,
        },
    });

    return result;
};

export const findAllBooks = async (
    filters: IBookFilters,
    options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
    const { search, ...filterData } = filters;
    const { size, page, skip, sortBy, sortOrder } = calculatePagination(options);

    const andConditions = [];

    if (search) {
        andConditions.push({
            OR: bookSearchableFields.map((field) => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive',
                },
            })),
        });
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: (filterData as any)[key],
                },
            })),
        });
    }

    const whereConditions: Prisma.BookWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.book.findMany({
        where: whereConditions,
        include: {
            category: true,
            reviewsAndRatings: true,
        },
        skip,
        take: size,
        orderBy:
            sortBy && sortOrder
                ? { [sortBy]: sortOrder }
                : {
                      createdAt: 'desc',
                  },
    });

    const total = await prisma.book.count({
        where: whereConditions,
    });
    const totalPage = Math.ceil(total / size);

    return {
        meta: {
            page,
            size,
            total,
            totalPage,
        },
        data: result,
    };
};

export const findBook = async (id: string): Promise<Book | null> => {
    const result = await prisma.book.findUnique({
        where: {
            id,
        },
        include: {
            category: true,
            reviewsAndRatings: true,
        },
    });

    return result;
};

export const editBook = async (id: string, payload: Partial<Book>): Promise<Book> => {
    const result = await prisma.book.update({
        where: {
            id,
        },
        include: {
            category: true,
            reviewsAndRatings: true,
        },
        data: payload,
    });

    return result;
};

export const removeBook = async (id: string): Promise<Book> => {
    const result = await prisma.book.delete({
        where: {
            id,
        },
    });

    return result;
};

export const findBooksByCategoryId = async (
    id: string,
    options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
    const { size, page, skip, sortBy, sortOrder } = calculatePagination(options);

    const result = await prisma.book.findMany({
        where: {
            categoryId: id,
        },
        skip,
        take: size,
        orderBy:
            sortBy && sortOrder
                ? { [sortBy]: sortOrder }
                : {
                      createdAt: 'desc',
                  },
    });

    const total = await prisma.book.count();
    const totalPage = Math.ceil(total / size);

    return {
        meta: {
            page,
            size,
            total,
            totalPage,
        },
        data: result,
    };
};
