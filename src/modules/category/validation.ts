import z from 'zod';

export const CategoryValidation = z.object({
    body: z.object({
        title: z.string({
            required_error: 'Title is required!',
        }),
    }),
});

export const updateCategoryValidation = z.object({
    body: z.object({
        title: z.string().optional(),
    }),
});
