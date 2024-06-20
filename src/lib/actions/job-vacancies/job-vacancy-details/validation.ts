import { z } from 'zod';
import { Status } from '@/status/interview-status';
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
      (val) =>
        val === 'WAITING' ||
        val === 'ASSESSMENT' ||
        val === 'INTERVIEW' ||
        val === 'REFERENCE CHECK',
      {
        message:
          'State Name Must Be Waiting Or Assessment Or Interview Or Reference Check!',
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
      (val) =>
        val === 'WAITING' ||
        val === 'ASSESSMENT' ||
        val === 'INTERVIEW' ||
        val === 'REFERENCE CHECK' ||
        val === 'REJECTED' ||
        val === 'BLACKLISTED',
      {
        message:
          'State Name Must Be Waiting or Assessment or Interview or Reference Check or Rejected or Blacklisted!',
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
  interviewId: z
    .number({
      required_error: 'Interview Id Required!',
      invalid_type_error: 'Interview Id Must Be A Number!',
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

export const validateInterviewResultSchema = z
  .object({
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
    interviewId: z
      .number({
        required_error: 'Interview Id Required!',
        invalid_type_error: 'Interview Id Must Be A Number!',
      })
      .int(),
    interviewerNik: z
      .string({
        required_error: 'Interviewer NIK Required!',
        invalid_type_error: 'Interviewer NIK Must Be A String!',
      })
      .trim()
      .length(9, { message: 'Interviewer NIK Must Contain 9 Numbers!' }),
    educationBackgroundRate: z
      .number({
        required_error: 'Education Background Rate Required!',
        invalid_type_error: 'Education Background Rate Must Be A Number!',
      })
      .int()
      .min(1, { message: 'Education Background Rate Must Be 1 - 4!' })
      .max(4, { message: 'Education Background Rate Must Be 1 - 4!' }),
    educationBackgroundComment: z
      .string({
        required_error: 'Education Background Comment Required!',
        invalid_type_error: 'Education Background Comment Must Be A String!',
      })
      .trim()
      .nullable()
      .default(''),
    workingExperienceRate: z
      .number({
        required_error: 'Working Experience Rate Required!',
        invalid_type_error: 'Working Experience Rate Must Be A Number!',
      })
      .int()
      .min(1, { message: 'Working Experience Rate Must Be 1 - 4!' })
      .max(4, { message: 'Working Experience Rate Must Be 1 - 4!' }),
    workingExperienceComment: z
      .string({
        required_error: 'Working Experience Comment Required!',
        invalid_type_error: 'Working Experience Comment Must Be A String!',
      })
      .trim()
      .nullable()
      .default(''),
    communicationSkillsRate: z
      .number({
        required_error: 'Communication Skills Rate Required!',
        invalid_type_error: 'Communication Skills Rate Must Be A Number!',
      })
      .int()
      .min(1, { message: 'Communication Skills Rate Must Be 1 - 4!' })
      .max(4, { message: 'Communication Skills Rate Must Be 1 - 4!' }),
    communicationSkillsComment: z
      .string({
        required_error: 'Communication Skills Comment Required!',
        invalid_type_error: 'Communication Skills Comment Must Be A String!',
      })
      .trim()
      .nullable()
      .default(''),
    qualityOrientedRate: z
      .number({
        required_error: 'Quality Oriented Rate Required!',
        invalid_type_error: 'Quality Oriented Rate Must Be A Number!',
      })
      .int()
      .min(1, { message: 'Quality Oriented Rate Must Be 1 - 4!' })
      .max(4, { message: 'Quality Oriented Rate Must Be 1 - 4!' }),
    qualityOrientedComment: z
      .string({
        required_error: 'Quality Oriented Comment Required!',
        invalid_type_error: 'Quality Oriented Comment Must Be A String!',
      })
      .trim()
      .nullable()
      .default(''),
    achievementOrientedRate: z
      .number({
        required_error: 'Achievement Oriented Rate Required!',
        invalid_type_error: 'Achievement Oriented Rate Must Be A Number!',
      })
      .int()
      .min(1, { message: 'Achievement Oriented Rate Must Be 1 - 4!' })
      .max(4, { message: 'Achievement Oriented Rate Must Be 1 - 4!' }),
    achievementOrientedComment: z
      .string({
        required_error: 'Achievement Oriented Comment Required!',
        invalid_type_error: 'Achievement Oriented Comment Must Be A String!',
      })
      .trim()
      .nullable()
      .default(''),
    developingOthersRate: z
      .number({
        required_error: 'Developing Others Rate Required!',
        invalid_type_error: 'Developing Others Rate Must Be A Number!',
      })
      .int()
      .min(1, { message: 'Developing Others Rate Must Be 1 - 4!' })
      .max(4, { message: 'Developing Others Rate Must Be 1 - 4!' }),
    developingOthersComment: z
      .string({
        required_error: 'Developing Others Comment Required!',
        invalid_type_error: 'Developing Others Comment Must Be A String!',
      })
      .trim()
      .nullable()
      .default(''),
    creativeAgilityRate: z
      .number({
        required_error: 'Creative Agility Rate Required!',
        invalid_type_error: 'Creative Agility Rate Must Be A Number!',
      })
      .int()
      .min(1, { message: 'Creative Agility Rate Must Be 1 - 4!' })
      .max(4, { message: 'Creative Agility Rate Must Be 1 - 4!' }),
    creativeAgilityComment: z
      .string({
        required_error: 'Creative Agility Comment Required!',
        invalid_type_error: 'Creative Agility Comment Must Be A String!',
      })
      .trim()
      .nullable()
      .default(''),
    leadingOthersRate: z
      .number({
        required_error: 'Leading Others Rate Required!',
        invalid_type_error: 'Leading Others Rate Must Be A Number!',
      })
      .int()
      .min(1, { message: 'Leading Others Rate Must Be 1 - 4!' })
      .max(4, { message: 'Leading Others Rate Must Be 1 - 4!' }),
    leadingOthersComment: z
      .string({
        required_error: 'Leading Others Comment Required!',
        invalid_type_error: 'Leading Others Comment Must Be A String!',
      })
      .trim()
      .nullable()
      .default(''),
    strategicThinkingRate: z
      .number({
        required_error: 'Strategic Thinking Rate Required!',
        invalid_type_error: 'Strategic Thinking Rate Must Be A Number!',
      })
      .int()
      .min(1, { message: 'Strategic Thinking Rate Must Be 1 - 4!' })
      .max(4, { message: 'Strategic Thinking Rate Must Be 1 - 4!' }),
    strategicThinkingComment: z
      .string({
        required_error: 'Strategic Thinking Comment Required!',
        invalid_type_error: 'Strategic Thinking Comment Must Be A String!',
      })
      .trim()
      .nullable()
      .default(''),
    reliablePartnerRate: z
      .number({
        required_error: 'Reliable Partner Rate Required!',
        invalid_type_error: 'Reliable Partner Rate Must Be A Number!',
      })
      .int()
      .min(1, { message: 'Reliable Partner Rate Must Be 1 - 4' })
      .max(4, { message: 'Reliable Partner Rate Must Be 1 - 4' }),
    reliablePartnerComment: z
      .string({
        required_error: 'Reliable Partner Comment Required!',
        invalid_type_error: 'Reliable Partner Comment Must Be A String!',
      })
      .trim()
      .nullable()
      .default(''),
    technologySavvyRate: z
      .number({
        required_error: 'Technology Savvy Rate Required!',
        invalid_type_error: 'Technology Savvy Rate Must Be A Number!',
      })
      .int()
      .min(1, { message: 'Technology Savvy Rate Must Be 1 - 4!' })
      .max(4, { message: 'Technology Savvy Rate Must Be 1 - 4!' }),
    technologySavvyComment: z
      .string({
        required_error: 'Technology Savvy Comment Required!',
        invalid_type_error: 'Technology Savvy Comment Must Be A String!',
      })
      .trim()
      .nullable()
      .default(''),
    status: z.nativeEnum(Status, {
      required_error: 'Status Required!',
      invalid_type_error: 'Status Must Be A Valid Status!',
    }),
    reason: z
      .string({
        required_error: 'Reason Required!',
        invalid_type_error: 'Reason Must Be A String!',
      })
      .trim()
      .default(''),
    rescheduler: z
      .string({
        required_error: 'Rescheduler Required!',
        invalid_type_error: 'Rescheduler Must Be A String!',
      })
      .trim()
      // .transform((val, ctx) => {
      //   if (val) {
      //     if (val?.toLowerCase()?.includes('candidate')) {
      //       return {
      //         rescheduler: val?.split('#')[1],
      //         candidateReschedulerId: val?.split('#')[0],
      //       };
      //     } else if (val?.toLowerCase()?.includes('user')) {
      //       return {
      //         rescheduler: val?.split('#')[1],
      //         userReschedulerNik: val?.split('#')[0],
      //       };
      //     }
      //   }

      //   ctx.addIssue({
      //     code: z.ZodIssueCode.custom,
      //     message: 'Rescheduler Must Be A Valid Rescheduler!',
      //   });

      //   return z.NEVER;
      // })
      .default('')
      .transform((val) => {
        if (val) {
          if (val?.toLowerCase()?.includes('candidate')) {
            return {
              rescheduler: val?.split('#')[1],
              candidateReschedulerId: Number(val?.split('#')[0]),
              userReschedulerNik: '',
            };
          } else if (val?.toLowerCase()?.includes('user')) {
            return {
              rescheduler: val?.split('#')[1],
              candidateReschedulerId: 0,
              userReschedulerNik: val?.split('#')[0],
            };
          }
        }

        return {
          rescheduler: '',
          candidateReschedulerId: 0,
          userReschedulerNik: '',
        };
      }),
  })
  .superRefine((val, ctx) => {
    if (val?.educationBackgroundRate <= 1 && !val?.educationBackgroundComment) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Education Background Comment Required!',
      });
    }

    if (val?.workingExperienceRate <= 1 && !val?.workingExperienceComment) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Working Experience Comment Required!',
      });
    }

    if (val?.communicationSkillsRate <= 1 && !val?.communicationSkillsComment) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Communication Skills Comment Required!',
      });
    }

    if (val?.qualityOrientedRate <= 1 && !val?.qualityOrientedComment) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Quality Oriented Comment Required!',
      });
    }

    if (val?.achievementOrientedRate <= 1 && !val?.achievementOrientedComment) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Achievement Oriented Comment Required!',
      });
    }

    if (val?.developingOthersRate <= 1 && !val?.developingOthersComment) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Developing Others Comment Required!',
      });
    }

    if (val?.creativeAgilityRate <= 1 && !val?.creativeAgilityComment) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Creative Agility Comment Required!',
      });
    }

    if (val?.leadingOthersRate <= 1 && !val?.leadingOthersComment) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Leading Others Comment Required!',
      });
    }

    if (val?.strategicThinkingRate <= 1 && !val?.strategicThinkingComment) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Strategic Thinking Comment Required!',
      });
    }

    if (val?.reliablePartnerRate <= 1 && !val?.reliablePartnerComment) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Reliable Partner Comment Required!',
      });
    }

    if (val?.technologySavvyRate <= 1 && !val?.technologySavvyComment) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Technology Savvy Comment Required!',
      });
    }

    if (
      (val?.status === Status.REJECT || val?.status === Status.KEEP_IN_VIEW) &&
      !val?.reason
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Reason Required!',
      });
    }

    if (val?.status === Status.RESCHEDULE && !val?.rescheduler) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Rescheduler Required!',
      });
    }
  });

export const validateInterviewIdAndInterviewerNik = z.object({
  interviewId: z
    .number({
      required_error: 'Interview Id Required!',
      invalid_type_error: 'Interview Id Must Be A Number!',
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
