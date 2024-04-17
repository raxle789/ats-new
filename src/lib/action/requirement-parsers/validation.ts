import { z } from 'zod';

export const validateEducationLevel = z.object({
  educationLevelId: z
    .string({
      required_error: 'Education level required!',
      invalid_type_error: 'Education level id must be a string!',
    })
    .trim()
    .transform((val, ctx) => {
      if (isNaN(Number(val))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Education level id cannot be parsed to number!',
        });

        return z.NEVER;
      }

      return Number(val);
    }),
});

export const validatePositionLevel = z.object({
  positionLevelId: z
    .string({
      required_error: 'Position level required!',
      invalid_type_error: 'Position id must be a string!',
    })
    .trim()
    .transform((val, ctx) => {
      if (isNaN(Number(val))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Position level id cannot be parsed to number!',
        });

        return z.NEVER;
      }

      return Number(val);
    }),
});

export const validateYearOfExperience = z.object({
  yearOfExperience: z
    .string({
      required_error: 'Year of experience required!',
      invalid_type_error: 'Year of experience must be a string!',
    })
    .trim()
    .transform((val, ctx) => {
      if (isNaN(Number(val))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Year of experience cannot be parsed to number!',
        });

        return z.NEVER;
      }

      return Number(val);
    }),
});

export const validateGrade = z.object({
  grade: z
    .string({
      required_error: 'Grade required!',
      invalid_type_error: 'Grade must be a string!',
    })
    .trim()
    .transform((val, ctx) => {
      if (isNaN(Number(val))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Grade cannot be parsed to number!',
        });

        return z.NEVER;
      }

      return val.toString();
    }),
});

export const validateLineIndustry = z.object({
  lineIndustryId: z
    .string({
      required_error: 'Line industry required!',
      invalid_type_error: 'Line industry must be a string!',
    })
    .trim()
    .transform((val, ctx) => {
      const isMatch = val?.match(/^(\d+#)+\d*$/);

      if (!isMatch) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid line industry format!',
        });

        return z.NEVER;
      } else {
        const parsedValue = val?.split('#')?.filter((value) => value !== '');

        const numberValue = parsedValue?.map((value) => Number(value));

        return numberValue;
      }
    }),
});

export const validateSalary = z.object({
  salary: z
    .string({
      required_error: 'Salary required!',
      invalid_type_error: 'Salary must be a string!',
    })
    .trim()
    .transform((val, ctx) => {
      const isMatch = val.match(/^(\d+\*)+\d*$/);

      if (!isMatch) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid salary format!',
        });

        return z.NEVER;
      } else {
        const parsedValue = val?.split('*');

        const numberValue = parsedValue.map((value) => Number(value));

        return numberValue;
      }
    }),
});
