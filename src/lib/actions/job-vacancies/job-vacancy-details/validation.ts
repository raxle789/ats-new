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
    .refine(
      (val) => val === 'WAITING' || val === 'ASSESSMENT' || val === 'INTERVIEW',
      {
        message: 'State Name Must Be Waiting Or Assessment or Interview!',
      },
    ),
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

export const validateInterviewSchema = z.object({
  title: z.coerce
    .string({
      required_error: 'Title Required!',
      invalid_type_error: 'Title Must Be A String!',
    })
    .trim(),
  dateTime: z.coerce.date({
    required_error: 'Date and Time Required!',
    invalid_type_error: 'Date and Time Must Be A Date!',
  }),
  meetingLink: z.coerce
    .string({
      required_error: 'Meeting Link Required!',
      invalid_type_error: 'Meeting Link Must Be A String!',
    })
    .default(''),
  type: z
    .number({
      required_error: 'Type Required!',
      invalid_type_error: 'Type Id Must Be A Number!',
    })
    .int(),
  interviewers: z.coerce
    .string({
      required_error: 'Interviewers Required!',
      invalid_type_error: 'Interviewers NIK Must Be A Number!',
    })
    .array(),
  message: z.coerce
    .string({
      required_error: 'Message Required!',
      invalid_type_error: 'Message Must Be A String!',
    })
    .trim(),
  place: z
    .number({
      required_error: 'Place Required!',
      invalid_type_error: 'Place Id Must Be A Number!',
    })
    .int()
    .default(0),
});

export const validateAssignApplicant = z.object({
  jobVacancyId: z
    .number({
      required_error: 'Job Vacancy Id Required!',
      invalid_type_error: 'Job Vacancy Id Must Be A Number!',
    })
    .int(),
  candidateId: z
    .number({
      required_error: 'Candidate Id Required!',
      invalid_type_error: 'Job Vacancy Id Must Be A Number!',
    })
    .int(),
  stateName: z.coerce
    .string({
      required_error: 'State Name Required!',
      invalid_type_error: 'State Name Must Be A String!',
    })
    .trim()
    .refine(
      (val) => val === 'WAITING' || val === 'ASSESSMENT' || val === 'INTERVIEW',
      {
        message: 'State Name Must Be Waiting Or Assessment Or Interview!',
      },
    ),
});

export const validateInterviewId = z.object({
  interviewId: z
    .number({
      required_error: 'Interview Id Required!',
      invalid_type_error: 'Interview Id Must Be A Number!',
    })
    .int(),
});

export const validateInterviewerNik = z.object({
  interviewerNik: z.coerce
    .string({
      required_error: 'Interviewer NIK Required!',
      invalid_type_error: 'Interviewer NIK Must Be A String!',
    })
    .trim()
    .length(9, { message: 'Interviewer NIK Must Contain 9 Numbers!' }),
});

export const validateInterviewResultData = z.object({
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
  interviewerNik: z.coerce
    .string({
      required_error: 'Interviewer NIK Required!',
      invalid_type_error: 'Interviewer NIK Must Be A String!',
    })
    .trim()
    .length(9, { message: 'Interviewer NIK Must Contain 9 Numbers!' }),
});
