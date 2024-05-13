import { z } from 'zod';

export const validateJobVacancyId = z.object({
  jobVacancyId: z
    .number({
      required_error: 'Job Vacancy Id Required!',
      invalid_type_error: 'Job Vacancy Id Must Be A Number!',
    })
    .int(),
});

export const validateJobVacancyIdAndStateName = z.object({
  jobVacancyId: z
    .number({
      required_error: 'Job Vacancy Id Required!',
      invalid_type_error: 'Job Vacancy Id Must Be A Number!',
    })
    .int(),
  stateName: z.coerce
    .string({
      required_error: 'State Name Required!',
      invalid_type_error: 'State Name Must Be A String!',
    })
    .trim()
    .refine((val) => val === 'WAITING' || val === 'ASSESSMENT', {
      message: 'State Name Must Be Waiting Or Assessment!',
    }),
});
