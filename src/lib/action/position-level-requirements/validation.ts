import { z } from 'zod';

export const validateForm = z.object({
  positionLevelId: z.coerce
    .number({
      required_error: 'Position level required!',
      invalid_type_error: 'Position level id must be a number!',
    })
    .int(),
  job_level: z.coerce
    .number({
      required_error: 'Job level required!',
      invalid_type_error: 'Job level must be a number!',
    })
    .int(),
  min_year_experience: z.coerce
    .number({
      required_error: 'Year of experience required!',
      invalid_type_error: 'Year of experience must be a number!',
    })
    .int(),
  line_industry: z.coerce
    .number({
      required_error: 'Line industry required!',
      invalid_type_error: 'Line industry id must be a number!',
    })
    .array(),
  education_level: z.coerce
    .number({
      required_error: 'Education level required!',
      invalid_type_error: 'Education level must be a number!',
    })
    .int(),
  grade: z.coerce.number({
    required_error: 'Grade required!',
    invalid_type_error: 'Grade must be a number!',
  }),
  salary: z
    .object({
      start_salary: z.coerce
        .number({
          required_error: 'Start salary required!',
          invalid_type_error: 'Start salary must be a number!',
        })
        .int(),
      end_salary: z.coerce
        .number({
          required_error: 'End salary required!',
          invalid_type_error: 'End salary must be a number!',
        })
        .int(),
    })
    .transform((val, ctx) => {
      if (val.start_salary < 0 || val.end_salary < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Salary cannot be negative!',
        });

        return z.NEVER;
      }

      if (val.start_salary > val.end_salary) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Start salary must be less than end salary!',
        });

        return z.NEVER;
      }

      return [val.start_salary, val.end_salary];
    }),
});

export const validatePositionLevelRequirementSchema = z.object({
  positionLevelId: z.coerce
    .number({
      required_error: 'Position level required!',
      invalid_type_error: 'Position id must be a number!',
    })
    .int(),
  key: z.coerce
    .string({
      required_error: 'Key required!',
      invalid_type_error: 'Key must be a string!',
    })
    .trim(),
  newValue: z.coerce
    .string({
      required_error: 'Value required!',
      invalid_type_error: 'Value must be a string!',
    })
    .trim(),
});

// export const validateArray = z.object({
//   value: z.coerce
//     .string({
//       required_error: 'Value required!',
//       invalid_type_error: 'Value must be a string!',
//     })
//     .trim()
//     .transform((val, ctx) => {
//       try {
//         const parsedValue = JSON.parse(val);

//         if (!Array.isArray(parsedValue)) {
//           ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: 'Value must be an array!',
//           });

//           return z.NEVER;
//         } else {
//           return parsedValue;
//         }

//         // if (Array.isArray(parsedValue)) {
//         //   // if (parsedValue.length === 0) {
//         //   //   ctx.addIssue({
//         //   //     code: z.ZodIssueCode.custom,
//         //   //     message: 'Array cannot be empty!',
//         //   //   });

//         //   //   return z.NEVER;
//         //   // }

//         //   // for (let i = 0; i < parsedValue.length; i++) {
//         //   //   if (isNaN(Number(parsedValue[i]))) {
//         //   //     ctx.addIssue({
//         //   //       code: z.ZodIssueCode.custom,
//         //   //       message: 'Array value must be a number!',
//         //   //     });

//         //   //     return z.NEVER;
//         //   //   }
//         //   // }

//         //   return parsedValue;
//         // } else {
//         //   if (isNaN(Number(val))) {
//         //     ctx.addIssue({
//         //       code: z.ZodIssueCode.custom,
//         //       message: 'Value cannot be parsed to array and number!',
//         //     });

//         //     return z.NEVER;
//         //   }

//         //   return Number(val);
//         // }
//       } catch (e) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           message: 'Invalid value format!',
//         });

//         return z.NEVER;

//         //   if (isNaN(Number(val))) {
//         //     ctx.addIssue({
//         //       code: z.ZodIssueCode.custom,
//         //       message: 'Value cannot be parsed to array and number!',
//         //     });

//         //     return z.NEVER;
//         //   }

//         //   return Number(val);
//         // }
//       }
//     }),
// });

// export const validateSalary = z.object({
//   value: z.coerce
//     .string({
//       required_error: 'Salary required!',
//       invalid_type_error: 'Salary must be a string!',
//     })
//     .trim()
//     .transform((val, ctx) => {
//       try {
//         const parsedValue = JSON.parse(val);

//         if (!Array.isArray(parsedValue)) {
//           ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: 'Salary must be an array!',
//           });

//           return z.NEVER;
//         } else {
//           return {
//             start_salary: parsedValue[0],
//             end_salary: parsedValue[1],
//           };
//         }
//       } catch (e) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           message: 'Salary value format!',
//         });

//         return z.NEVER;
//       }
//     }),
// });

// export const validateNumber = z.object({
//   value: z.coerce
//     .string({
//       required_error: 'Value required!',
//       invalid_type_error: 'Value must be a string!',
//     })
//     .trim()
//     .transform((val, ctx) => {
//       if (isNaN(Number(val))) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           message: 'Value cannot be parsed to number!',
//         });

//         return z.NEVER;
//       }

//       return Number(val);
//     }),
// });

// export const validateEducationLevelSchema = z.object({
//   educationLevelId: z
//     .number({
//       required_error: 'Education level required!',
//       invalid_type_error: 'Education level id must be a number!',
//     })
//     .int(),
// });

// export const validatePositionLevelSchema = z.object({
//   positionLevelId: z
//     .number({
//       required_error: 'Position level required!',
//       invalid_type_error: 'Position id must be a number!',
//     })
//     .int(),
// });

// export const validateLineIndustrySchema = z.object({
//   lineIndustries: z
//     .string()
//     .array()
//     .nonempty({ message: 'Line industry required!' }),
// });
