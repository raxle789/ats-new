import { z } from 'zod';

export const REGISTER = z.object({
    fullname: z.string().min(3, { message: 'Fullname must contains at least 3 characters' }),
    email: z.string().email({ message: 'Please use a valid email format' }).refine(email => /^[a-z]*$/.test(email.replace(/[@.]/g, '')), { message: 'Email may only be written in lowercase' }),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    dateOfBirth: z.instanceof(Date).refine(date => 2024 - date.getFullYear() >= 18, { message: 'Minimun age is 18 years old' } ),
    phoneNumber: z.string().max(16, { message: 'Phone number must not exceed 16 digits' })
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Password doesn\'t match', path: ['confirmPassword']
});

export const REGISTER_2 = z.object({
    profile: z.object({
        uploadPhoto: z.nullable(z.string()),
        fullname: z.string().min(3, { message: 'Fullname must contains at least 3 characters' }),
        email: z.string().email(),
        phoneNumber: z.string().max(16, { message: 'Phone number must not exceed 16 digits' }),
        dateOfBirth: z.instanceof(Date).refine(date => 2024 - date.getFullYear() >= 18, { message: 'Minimun age is 18 years old' } ),
        placeOfBirth: z.string(),
        gender: z.string(),
        religion: z.string(),
        ethnicity: z.string(),
        bloodType: z.string().max(2),
        maritalStatus: z.string()
    }),
    addressCheckbox: z.boolean(),
    address: z.object({
        permanentAddress: z.string(),
        country: z.string(),
        rt: z.string(),
        rw: z.string(),
        city: z.string(),
        subdistrict: z.string(),
        village: z.string(),
        zipCode: z.string(),
        currentAddress: z.string()
    }),
    // families
    
});