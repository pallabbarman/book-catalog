/* eslint-disable import/prefer-default-export */
import z from 'zod';

export const userValidation = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required!',
        }),
        email: z
            .string({
                required_error: 'Email is required!',
            })
            .email({ message: 'Please enter a valid email!' }),
        password: z.string({
            required_error: 'Password is required!',
        }),
        role: z.string({
            required_error: 'Role is required!',
        }),
        contactNo: z.string({
            required_error: 'Contact number is required!',
        }),
        address: z.string({
            required_error: 'Address is required!',
        }),
        profileImg: z.string({
            required_error: 'Profile image is required!',
        }),
    }),
});
