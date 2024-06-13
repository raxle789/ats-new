import { z } from 'zod';
import CryptoJS from 'crypto-js';

export const validateForm = z
  .object({
    positionLevelId: z.coerce
      .string({
        required_error: 'Position Level Required!',
        invalid_type_error: 'Position Level Id Must Be A String!',
      })
      .trim()
      .transform((val, ctx) => {
        try {
          const query = decodeURIComponent(val) ?? '';

          const decryptedValue = CryptoJS.Rabbit.decrypt(
            String(query),
            process.env.NEXT_PUBLIC_SECRET_KEY,
          );

          const convertString = decryptedValue.toString(CryptoJS.enc.Utf8);

          const originalValue = Number(convertString);

          return originalValue;
        } catch (e) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid Position Level Id's format!",
          });

          return z.NEVER;
        }
      }),
    job_level: z
      .number({
        required_error: 'Job Level Required!',
        invalid_type_error: 'Job Level Must Be A Number!',
      })
      .int(),
    min_year_experience: z
      .number({
        required_error: 'Year Of Experience Required!',
        invalid_type_error: 'Year Of Experience Must Be A Number!',
      })
      .int(),
    line_industry: z
      .number({
        required_error: 'Line Industry Required!',
        invalid_type_error: 'Line Industry Must Be A Number!',
      })
      .array(),
    education_level: z
      .number({
        required_error: 'Education Level Required!',
        invalid_type_error: 'Education Level Must Be A Number!',
      })
      .int(),
    grade: z.number({
      required_error: 'Grade Required!',
      invalid_type_error: 'Grade Must Be A Number!',
    }),
    start_salary: z
      .number({
        required_error: 'Start Salary Range Required!',
        invalid_type_error: 'Start Salary Range Must Be A Number!',
      })
      .int()
      .positive()
      .gte(1000),
    end_salary: z
      .number({
        required_error: 'End Salary Range Required!',
        invalid_type_error: 'End Salary Range Must Be A Number!',
      })
      .int()
      .positive()
      .gte(1000),
    salary: z
      .number({
        required_error: 'Salary Required!',
        invalid_type_error: 'Salary Must Be A Number!',
      })
      .array()
      .length(2),
    // salary: z
    //   .object({
    //     start_salary: z
    //       .number({
    //         required_error: 'Start Salary Required!',
    //         invalid_type_error: 'Start Salary Must Be A Number!',
    //       })
    //       .int(),
    //     end_salary: z
    //       .number({
    //         required_error: 'End Salary Required!',
    //         invalid_type_error: 'End Salary Must Be A Number!',
    //       })
    //       .int(),
    //   })
    //   .transform((val, ctx) => {
    //     if (val.start_salary < 0 || val.end_salary < 0) {
    //       ctx.addIssue({
    //         code: z.ZodIssueCode.custom,
    //         message: 'Salary Cannot Be Negative!',
    //       });

    //       return z.NEVER;
    //     }

    //     if (val.start_salary > val.end_salary) {
    //       ctx.addIssue({
    //         code: z.ZodIssueCode.custom,
    //         message: 'Start Salary Cannot Be Greater Than End Salary!',
    //       });

    //       return z.NEVER;
    //     }

    //     return [val.start_salary, val.end_salary];
    //   }),
  })
  .superRefine((value, ctx) => {
    if (value?.start_salary >= value?.end_salary) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Start Salary Range Must Be Less Than End Salary Range!',
      });
    }
  })
  .transform((val) => {
    val.salary = [val?.start_salary, val?.end_salary];

    return val;
  });

export const validatePositionLevelRequirementSchema = z.object({
  positionLevelId: z
    .number({
      required_error: 'Position Level Required!',
      invalid_type_error: 'Position Level Id Must Be A Number!',
    })
    .int(),
  key: z.coerce
    .string({
      required_error: 'Position Level Requirement Field Required!',
      invalid_type_error: 'Position Level Requirement Field Must Be A String',
    })
    .trim(),
  newValue: z.coerce
    .string({
      required_error: 'Position Level Requirement Value Required!',
      invalid_type_error: 'Position Level Requirement Value Must Be A String!',
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
