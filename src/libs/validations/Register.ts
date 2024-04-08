import { z } from 'zod';

export const userRegister1 = z.object({
    name: z.string().min(6),
    email: z.string().email(),
    password: z.string().min(8),
    confirm_password: z.string().min(8),
}).refine((data) => data.password === data.confirm_password, {
    message: 'Password doesn\'t match',
});

export const userRegister2 = z.object({
    gender: z.string().refine((data) => data !== 'default', { message: 'Please choose the right gender' }),
    phone_number: z.string().min(12),
    date_of_birth: z.string().min(1),
    source_referer: z.string().refine((data) => data !== 'default', { message: 'Please the right source' }),
    current_salary: z.string(),
    linkedin_profile_url: z.string()
});

export const registerStep2 = z.object({
    gender: z.string().min(6),
    phone_number: z.coerce.number().max(13),
    birth_city: z.coerce.number(),
    domicile: z.coerce.number()
});