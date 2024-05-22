import { z, string } from 'zod';

export const REGISTER = z.object({
    fullname: z.string().min(3, { message: 'Fullname must contains at least 3 characters' }),
    email: z.string().email({ message: 'Please use a valid email format' }),
    // .refine(email => /^[a-z]*$/.test(email.replace(/[@.]/g, '')), { message: 'Email may only be written in lowercase' }),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    dateOfBirth: z.instanceof(Date).refine(date => 2024 - date.getFullYear() >= 18, { message: 'Minimun age is 18 years old' } ),
    phoneNumber: z.string().max(16, { message: 'Phone number must not exceed 16 digits' })
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Password doesn\'t match', path: ['confirmPassword']
});

const PROFILE = z.object({
    fullname: z.string().min(3, { message: 'Fullname must contains at least 3 characters' }),
    email: z.string().email(),
    phoneNumber: z.string().max(16, { message: 'Phone number must not exceed 16 digits' }),
    // dateOfBirth: z.string().datetime(),
    dateOfBirth: z.coerce.date(),
    placeOfBirth: z.coerce.string(),
    gender: z.string(),
    religion: z.string(),
    ethnicity: z.string(),
    bloodType: z.string().max(2),
    maritalStatus: z.string()
});

const ADDRESSES = z.object({
    permanentAddress: z.string(),
    country: z.string(),
    rt: z.string().default(''),
    rw: z.string().default(''),
    city: z.coerce.string(),
    subdistrict: z.string().default(''),
    village: z.string().default(''),
    zipCode: z.string(),
    currentAddress: z.nullable(z.string())
});

const FAMILIES = z.array(z.object({
    relation: z.string(),
    name: z.string(),
    gender: z.string(),
    dateOfBirth: z.coerce.date()
}));

const EDUCATION = z.object({
    educationLevel: z.string(),
    educationMajor: z.coerce.string(),
    schoolName: z.coerce.string(),
    gpa: z.number(),
    cityOfSchool: z.coerce.string(),
    startEduYear: z.coerce.date(),
    endEduYear: z.coerce.date()
});

const CERTIFICATIONS = z.array(z.object({
    // certificationName: z.array(z.any()),
    certificationName: z.coerce.string(), // idk whether coerce to string or number
    institution: z.string(),
    monthIssue: z.coerce.date(),
    yearIssue: z.coerce.date(),
})).default([]);

const SKILLS = z.array(z.any());

const LANGUAGES = z.object({
    name: z.string(),
    level: z.string()
});

const EXPERIENCES = z.array(z.object({
    jobTitle: z.string(),
    jobFunction: z.string(),
    lineIndustry: z.string(),
    positionLevel: z.string(),
    compName: z.string(),
    jobDesc: z.string().default(''),
    startYear: z.coerce.date(),
    endYear: z.coerce.date(),
    currentSalary: z.number()
}));

const OTHERS = z.object({
    emergencyContactName: z.string(),
    emergencyContactPhoneNumber: z.string(),
    emergencyContactRelation: z.string(),
    noticePeriod: z.string(),
    everWorkedMonth: z.string().default(''),
    everWorkedYear: z.string().default(''),
    diseaseName: z.string().default(''),
    diseaseYear: z.string().default(''),
    relationName: z.string().default(''),
    relationPosition: z.string().default('')
});

export const REGISTER_2 = z.object({
    profile: PROFILE,
    address: ADDRESSES,
    families: FAMILIES.default([]),
    education: EDUCATION,
    certification: CERTIFICATIONS.default([]),
    skills: SKILLS.default([]),
    language: z.array(LANGUAGES),
    experience: EXPERIENCES.default([]),
    others: OTHERS
}).refine(data => data.profile.maritalStatus !== 'Married' || data.profile.maritalStatus === 'Married' && data.families.length > 0, {
    message: `Please fill in your spouse's data`,
    path: ['families', 'relation', 'name', 'gender', 'dateOfBirth']
});