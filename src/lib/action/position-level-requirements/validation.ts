import { z } from 'zod';

export const validatePositionLevelRequirementSchema = z.object({
  positionLevelId: z
    .number({
      required_error: 'Position level required!',
      invalid_type_error: 'Position id must be a number!',
    })
    .int(),
  key: z
    .string({
      required_error: 'Key required!',
      invalid_type_error: 'Key must be a string!',
    })
    .trim(),
  newValue: z
    .string({
      required_error: 'Value required!',
      invalid_type_error: 'Value must be a string!',
    })
    .trim(),
});

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
