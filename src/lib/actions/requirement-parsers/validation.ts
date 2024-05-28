import { z } from 'zod';

export const validateEducationLevel = z.object({
  valueToParse: z.coerce
    .string({
      required_error: 'Education Level Required!',
      invalid_type_error: 'Education Level Id Must Be A String!',
    })
    .trim()
    .transform((val, ctx) => {
      if (isNaN(Number(val))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Education Level Id Cannot Be Parsed To Number!',
        });

        return z.NEVER;
      }

      return Number(val);
    }),
});

export const validatePositionLevel = z.object({
  valueToParse: z.coerce
    .string({
      required_error: 'Position Level Required!',
      invalid_type_error: 'Position Level Id Must Be A String!',
    })
    .trim()
    .transform((val, ctx) => {
      if (isNaN(Number(val))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Position Level Id Cannot Be Parsed To Number!',
        });

        return z.NEVER;
      }

      return Number(val);
    }),
});

export const validateYearOfExperience = z.object({
  valueToParse: z.coerce
    .string({
      required_error: 'Year Of Experience Required!',
      invalid_type_error: 'Year Of Experience Must Be A String!',
    })
    .trim()
    .transform((val, ctx) => {
      if (isNaN(Number(val))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Year Of Experience Cannot Be Parsed To Number!',
        });

        return z.NEVER;
      }

      return Number(val);
    }),
});

export const validateGrade = z.object({
  valueToParse: z.coerce
    .string({
      required_error: 'Grade Required!',
      invalid_type_error: 'Grade Must Be A String!',
    })
    .trim()
    .transform((val, ctx) => {
      if (isNaN(Number(val))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Grade Cannot Be Parsed To Number!',
        });

        return z.NEVER;
      }

      return val.toString();
    }),
});

export const validateLineIndustry = z.object({
  valueToParse: z.coerce
    .string({
      required_error: 'Line Industry Required!',
      invalid_type_error: 'Line Industry Must Be A String!',
    })
    .trim()
    .transform((val, ctx) => {
      // const isMatch = val?.match(/^(\d+#)+\d*$/);
      // if (!isMatch) {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: 'Invalid line industry format!',
      //   });
      //   return z.NEVER;
      // } else {
      //   const parsedValue = val?.split('#')?.filter((value) => value !== '');
      //   const numberValue = parsedValue?.map((value) => Number(value));
      //   return numberValue;
      // }

      try {
        const parsedValue = JSON.parse(val);

        if (!Array.isArray(parsedValue)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Line Industry Must Be An Array!',
          });
        }

        return parsedValue;
      } catch (e) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid Line Industry Format!',
        });

        return z.NEVER;
      }
    }),
});

export const validateSalary = z.object({
  valueToParse: z.coerce
    .string({
      required_error: 'Salary Required!',
      invalid_type_error: 'Salary Must Be A String!',
    })
    .trim()
    .transform((val, ctx) => {
      // const isMatch = val.match(/^(\d+\*)+\d*$/);
      // if (!isMatch) {
      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: 'Invalid salary format!',
      //   });
      //   return z.NEVER;
      // } else {
      //   const parsedValue = val?.split('*');
      //   const numberValue = parsedValue.map((value) => Number(value));
      //   return numberValue;
      // }

      try {
        const parsedValue = JSON.parse(val);

        if (!Array.isArray(parsedValue)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Salary Must Be An Array!',
          });
        }

        return parsedValue;
      } catch (e) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid Salary Format!',
        });

        return z.NEVER;
      }
    }),
});

export const validateArray = z.object({
  value: z.coerce
    .string({
      required_error: 'Value Required!',
      invalid_type_error: 'Value Must Be A String!',
    })
    .trim()
    .transform((val, ctx) => {
      try {
        const parsedValue = JSON.parse(val);

        if (!Array.isArray(parsedValue)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Value Must Be An Array!',
          });

          return z.NEVER;
        } else {
          return parsedValue;
        }
      } catch (e) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid Value Format!',
        });

        return z.NEVER;
      }
    }),
});

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

export const validateNumber = z.object({
  value: z.coerce
    .string({
      required_error: 'Value Required!',
      invalid_type_error: 'Value Must Be A String!s',
    })
    .trim()
    .transform((val, ctx) => {
      if (isNaN(Number(val))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Value Cannot Be Parsed To Number!',
        });

        return z.NEVER;
      }

      return Number(val);
    }),
});

export const validateAge = z.object({
  valueToParse: z.coerce
    .string({
      required_error: 'Age Required!',
      invalid_type_error: 'Age Must Be A String!',
    })
    .trim()
    .transform((val, ctx) => {
      if (isNaN(Number(val))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Age Cannot Be Parsed To Number!',
        });

        return z.NEVER;
      }

      return val.toString();
    }),
});

export const validateGender = z.object({
  valueToParse: z.coerce
    .string({
      required_error: 'Gender Required!',
      invalid_type_error: 'Gender Id Must Be A String!',
    })
    .trim()
    .transform((val, ctx) => {
      if (isNaN(Number(val))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Gender Id Cannot Be Parsed To Number!',
        });

        return z.NEVER;
      }

      return val.toString();
    }),
});

export const validateSkill = z.object({
  valueToParse: z.coerce
    .string({
      required_error: 'Skill Required!',
      invalid_type_error: 'Skill Id Must Be A String!',
    })
    .trim()
    .transform((val, ctx) => {
      try {
        const parsedValue = JSON.parse(val);

        if (!Array.isArray(parsedValue)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Skill Must Be An Array!',
          });
        }

        return parsedValue;
      } catch (e) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid Skill Format!',
        });

        return z.NEVER;
      }
    }),
});

export const validateCertificate = z.object({
  valueToParse: z.coerce
    .string({
      required_error: 'Certificate Required!',
      invalid_type_error: 'Certificate Id Must Be A String!',
    })
    .trim()
    .transform((val, ctx) => {
      try {
        const parsedValue = JSON.parse(val);

        if (!Array.isArray(parsedValue)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Certificate Must Be An Array!',
          });
        }

        return parsedValue;
      } catch (e) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid Certificate Format!',
        });

        return z.NEVER;
      }
    }),
});
