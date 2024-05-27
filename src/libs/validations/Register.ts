import { z } from 'zod';

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
    dateOfBirth: z.coerce.date(),
    placeOfBirth: z.array(z.string(), { required_error: 'Please select your place of birth' }).refine(city => city.length > 0, { message: 'Please select your place of birth' }),
    gender: z.string({ required_error: 'Please select your gender' }),
    religion: z.string({ required_error: 'Please select your religion' }),
    ethnicity: z.string({ required_error: 'Please select your religion' }),
    bloodType: z.string({ required_error: 'Please select your blood type' }).max(2),
    maritalStatus: z.string({ required_error: 'Please select your marital status' })
}).refine(profile => 2024 - profile.dateOfBirth.getFullYear() > 18, { message: 'Minimum age is 18 years old' });

const ADDRESSES = z.object({
    permanentAddress: z.string({ required_error: 'Please fill in your permanent address' }),
    country: z.string({ required_error: 'Please select your country' }),
    rt: z.string({ required_error: 'Please fill in your rt' }).default(''),
    rw: z.string({ required_error: 'Please fill in your rw' }).default(''),
    city: z.array(z.string(), { required_error: 'Please select or fill in your city' }).refine(city => city.length == 1, { message: 'Please select or fill in your city' }),
    subdistrict: z.string({ required_error: 'Please fill in your subdistrict' }).default(''),
    village: z.string({ required_error: 'Please fill in your village' }).default(''),
    zipCode: z.string({ required_error: 'Please fill in your zipcode' }),
    currentAddress: z.nullable(z.string().default(''))
}).superRefine((address, ctx) => {
    if(address.country === 'Indonesia') {
        type TypeIndonesianRequiredAddress = {
            rt: string;
            rw: string;
            subdistrict: string;
            village: string;
        };
        const indonesianRequiredAddress: TypeIndonesianRequiredAddress = {
            rt: address.rt,
            rw: address.rw,
            subdistrict: address.subdistrict,
            village: address.village
        };
        for(const key in indonesianRequiredAddress) {
            if(indonesianRequiredAddress[key as keyof TypeIndonesianRequiredAddress] === '') {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `Please fill in your ${key}`,
                    path: [`${key}`]
                })
            }
        };
    };
});

const FAMILIES = z.array(z.object({
    relation: z.string(),
    name: z.string(),
    gender: z.string(),
    dateOfBirth: z.coerce.date()
}));

const EDUCATION = z.object({
    educationLevel: z.string(),
    educationMajor: z.array(z.string()).default([]),
    schoolName: z.array(z.string()),
    gpa: z.number().default(0),
    cityOfSchool: z.array(z.string()),
    startEduYear: z.string(),
    endEduYear: z.string()
}).superRefine((data, ctx) => {
    const educationLevels = ['D3', 'D4', 'S1/Sarjana', 'S2/Magister', 'S3/Doktor'];
    type TypeRequiredEducationFields = {
        educationMajor: string[];
        gpa: number;
    };

    const requiredEducationFields: TypeRequiredEducationFields = {
        educationMajor: data.educationMajor,
        gpa: data.gpa
    };

    if(educationLevels.includes(data.educationLevel)) {
        for(const key in requiredEducationFields) {
            const requiredProp = requiredEducationFields[key as keyof TypeRequiredEducationFields];
            if(Array.isArray(requiredProp)) {
                if(requiredProp.length === 0) ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Required',
                    path: [`${key}`]
                });
            } else {
                if(requiredProp === 0) ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Required',
                    path: [`${key}`]
                });
            };
        };
    };
}) ;

const CERTIFICATIONS = z.array(z.object({
    certificationName: z.coerce.string(), // idk whether coerce to string or number and if value can't be parsed into a number, store to certificates table first
    institution: z.string(),
    monthIssue: z.coerce.date(),
    yearIssue: z.coerce.date(),
}));

const SKILLS = z.array(z.any()).refine(skills => skills.length > 0, { message: 'Please select or provide at least one skill', path: ['skill'] }).default([]);

const LANGUAGES = z.array(z.object({
    name: z.string(),
    level: z.string()
})).refine(languages => languages.length > 0, { message: 'Please select at least one language', path: ['name'] });

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
    emergencyContactName: z.string().default(''),
    emergencyContactPhoneNumber: z.string().default(''),
    emergencyContactRelation: z.string().default(''),
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
    families: FAMILIES,
    education: EDUCATION,
    certification: CERTIFICATIONS,
    skills: SKILLS,
    language: LANGUAGES,
    expOption: z.string({ required_error: 'Please choose whether you are a fresh graduate or experienced' }),
    expectedSalary: z.number({ required_error: 'Please fill in your expected salary', invalid_type_error: 'Expected salary must cannot be empty' })
                    .positive()
                    .lte(1000000000, { message: 'The number of digits is not greater than 10' }).default(1).refine(salary => salary > 1, { message: 'Please fill in your expected salary' }),
    experience: EXPERIENCES,
    everWorkedOption: z.string(),
    diseaseOption: z.string(),
    relationOption: z.string(),
    others: OTHERS,
}).superRefine((data, ctx) => {
    /* Validate if the candidate already Married, must fill families spouse */
    if(data.profile.maritalStatus === 'Married' && data.families.length <= 0) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Please select spouse relation',
            path: ['families', 'relation']
        });
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Please fill in with your spouse name',
            path: ['families', 'name']
        });
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Please select your spouse gender',
            path: ['families', 'gender']
        });
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Please select your spouse date of birth',
            path: ['families', 'dateOfBirth']
        });
    };
    /* Validate at least must have one skill */
    // if(data.skills.length < 0) {
    //     ctx.addIssue({
    //         code: z.ZodIssueCode.custom,
    //         message: 'Please select or provide at least one skill',
    //         path: ['skills']
    //     })
    // };
    /* Validate if expOption === ''Professional, should fill the experience fields */
    if(data.expOption === 'Professional' && data.experience.length <= 0) {
        console.log('Experience ', data.experience.length);
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'You have to fill in the experience fields',
            path: ['experience']
        });
    } else if(data.expOption === 'Professional' && data.expectedSalary === null) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'You have to fill in the experience fields',
            path: ['experience']
        });
    };
});

export const DOCUMENTS_REGISTER = z.object({
    profilePhoto: z.instanceof(File, { message: 'Profile photo shouldn\'t be empty' }),
    curriculumVitae: z.instanceof(File, { message: 'Curriculum vitae shouldn\'t be empty' })
                        .refine(file => file.size <= 1000000, {  message: 'File must be less than 1mb'})
});