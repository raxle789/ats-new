import { z } from 'zod';
import moment from 'moment';

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

export const validateCandidateIdAndJobVacancyId = z.object({
  candidateId: z
    .number({
      required_error: 'Candidate Id Required!',
      invalid_type_error: 'Candidate Id Must Be A Number!',
    })
    .int(),
  jobVacancyId: z
    .number({
      required_error: 'Job Vacancy Id Required!',
      invalid_type_error: 'Job Vacancy Id Must Be A Number!',
    })
    .int(),
});

export const validateAssessmentSchema = z.object({
  id: z.coerce
    .string({
      required_error: 'Assessment Id Required!',
      invalid_type_error: 'Assessment Id Must Be A String!',
    })
    .trim()
    .transform((val, ctx) => {
      if (isNaN(Number(val))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Assessment Id Cannot Be Parsed To Number!',
        });

        return z.NEVER;
      }

      return Number(val);
    }),
  status: z.coerce
    .string({
      required_error: 'Assessment Status Required!',
      invalid_type_error: 'Assessment Status Must Be A String!',
    })
    .trim()
    .transform((val, ctx) => {
      if (isNaN(Number(val))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Assessment Status Cannot Be Parsed To Number!',
        });

        return z.NEVER;
      }

      return Number(val);
    }),
  mulai: z.coerce
    .string({
      required_error: 'Assessment Start Date Required!',
      invalid_type_error: 'Assessment Start Date Must Be A String!',
    })
    .trim()
    .transform((val, ctx) => {
      if (!moment(val, 'YYYY-MM-DD HH:mm:ss').isValid()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Assessment Start Date Must Be A Valid Date!',
        });

        return z.NEVER;
      }

      return moment(val, 'YYYY-MM-DD HH:mm:ss');
    }),
  selesai: z.coerce
    .string({
      required_error: 'Assessment End Date Required!',
      invalid_type_error: 'Assessment End Date Must Be A String!',
    })
    .trim()
    .transform((val, ctx) => {
      if (!moment(val, 'YYYY-MM-DD HH:mm:ss').isValid()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Assessment End Date Must Be A Valid Date!',
        });

        return z.NEVER;
      }

      return moment(val, 'YYYY-MM-DD HH:mm:ss');
    }),
});
