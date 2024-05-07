import { z } from 'zod';

export const validateTaId = z.object({
  taId: z
    .number({
      required_error: 'TA Required!',
      invalid_type_error: 'TA Id Must Be A Number!',
    })
    .int(),
});

export const validateRequestNo = z.object({
  requestNo: z.coerce
    .string({
      required_error: 'FPK Request No Required!',
      invalid_type_error: ' FPK Request No Must Be A String!',
    })
    .trim(),
});

export const validateEfpk = z.object({
  RequestNo: z.coerce
    .string({
      required_error: 'FPK Request No Required!',
      invalid_type_error: 'FPK Request No Must Be A String!',
    })
    .trim(),
  JobTitleCode: z.coerce
    .string({
      required_error: 'Job Title Code Required!',
      invalid_type_error: 'Job Title Code Must Be A String!',
    })
    .trim(),
  EmpType: z.coerce
    .string({
      required_error: 'Employment Type Required!',
      invalid_type_error: 'Employment Type Must Be A String!',
    })
    .trim(),
  JobLvlCode: z.coerce
    .string({
      required_error: 'Job Level Code Required!',
      invalid_type_error: 'Job Level Code Must Be A String!',
    })
    .trim()
    .transform((val, ctx) => {
      const validator = '0123456789';

      const isMatch = [...val].reduce((x, y) => {
        if (validator.includes(y)) {
          return x + y;
        } else {
          return x;
        }
      }, '');

      if (isMatch) {
        if (isNaN(Number(isMatch))) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Job Level Code Cannot Parse to Number!',
          });
        }

        return Number(isMatch);
      } else {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Job Level Code Cannot Parse to Number!',
        });
      }
    }),
  OrgGroupName: z.coerce
    .string({
      required_error: 'Organization Group Name Required!',
      invalid_type_error: 'Organization Group Name Must Be A String!',
    })
    .trim()
    .transform((val, ctx) => {
      const parsedValue = val.slice(0, val.indexOf(' '));

      if (parsedValue) {
        return parsedValue;
      } else {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Organization Group Name Cannot Parse to String!',
        });
      }
    }),
  OrgGroupCode: z.coerce
    .string({
      required_error: 'Organization Group Code Required!',
      invalid_type_error: 'Organization Group Code Must Be A String!',
    })
    .trim(),
  LocationCode: z.coerce
    .string({
      required_error: 'Location Code Required!',
      invalid_type_error: 'Location Code Must Be A String!',
    })
    .trim(),
  sla_days: z
    .number({
      required_error: 'SLA Days Required!',
      invalid_type_error: 'SLA Days Must Be A Number!',
    })
    .int(),
});

export const validateVerticalCode = z.object({
  verticalCode: z.coerce
    .string({
      required_error: 'Vertical Code Required!',
      invalid_type_error: 'Vertical Code Must Be A String!',
    })
    .trim(),
});

export const validateJobVacancySchema = z.object({
  taId: z
    .number({
      required_error: 'TA Id Required !',
      invalid_type_error: 'TA Id Must Be A Number!',
    })
    .int(),
  jobEfpk: z.coerce
    .string({
      required_error: 'Job FPK Required!',
      invalid_type_error: 'Job FPK Request No Must Be A String!',
    })
    .trim()
    .min(1),
  jobTitle: z.coerce
    .string({
      required_error: 'Job Title FPK Required!',
      invalid_type_error: 'Job Title FPK Must Be A String!',
    })
    .trim()
    .min(1),
  jobTitleAliases: z.coerce
    .string({
      required_error: 'Job Posting Name Required!',
      invalid_type_error: 'Job Posting Name Must Be A String!',
    })
    .trim()
    .min(1),
  jobFunction: z
    .number({
      required_error: 'Job Function Required!',
      invalid_type_error: 'Job Function Id Must Be A Number!',
    })
    .int(),
  jobEmploymentStatus: z.coerce
    .string({
      required_error: 'Employment Status Required!',
      invalid_type_error: 'Employment Status Name Must Be A String!',
    })
    .trim()
    .min(1),
  jobPositionLevel: z
    .number({
      required_error: 'Position Level Required!',
      invalid_type_error: 'Position Level Id Must Be A Number!',
    })
    .int(),
  jobVertical: z.coerce
    .string({
      required_error: 'Vertical Required!',
      invalid_type_error: 'Vertical Code Must Be A String!',
    })
    .trim()
    .min(1),
  jobDepartment: z.coerce
    .string({
      required_error: 'Department Required!',
      invalid_type_error:
        'Department Organization Group Code Must Be A String!',
    })
    .trim()
    .min(1),
  jobLineIndustry: z
    .number({
      required_error: 'Line Industry Required!',
      invalid_type_error: 'Line Industry Id Must Be A Number!',
    })
    .array(),
  jobRegion: z.coerce
    .string({
      required_error: 'Region Required!',
      invalid_type_error: 'Region Location Group Code Must Be A String!',
    })
    .trim()
    .min(1),
  jobWorkLocation: z.coerce
    .string({
      required_error: 'Work Location Required!',
      invalid_type_error: 'Work Location Code Must Be A String!',
    })
    .trim()
    .min(1),
  jobWorkLocationAddress: z.coerce
    .string({
      required_error: 'Work Location Address Required!',
      invalid_type_error: 'Work Location Address Must Be A String!',
    })
    .trim()
    .min(1),
  jobPublishedDateAndExpiredDate: z.coerce
    .date({
      required_error: 'Published Date And Expired Date Required!',
      invalid_type_error: 'Published Date And Expired Date Must Be A Date!',
    })
    .array()
    .length(2),
  jobDescription: z.coerce
    .string({
      required_error: 'Job Description Required!',
      invalid_type_error: 'Job Description Must Be A String!',
    })
    .trim()
    .min(1),
  jobRequirement: z.coerce
    .string({
      required_error: 'Job Requirement Required!',
      invalid_type_error: 'Job Requirement Must Be A String!',
    })
    .trim()
    .min(1),
  ageParameterCheckbox: z.coerce
    .boolean({
      required_error: 'Age Parameter Checkbox Required!',
      invalid_type_error: 'Age Parameter Checkbox Must Be A Boolean!',
    })
    .default(false),
  age: z
    .number({
      required_error: 'Age Parameter Required!',
      invalid_type_error: 'Age Parameter Must Be A Number!',
    })
    .int()
    .transform((val) => JSON.stringify(val))
    .nullable()
    .transform((val) => (val === null ? 1 : val))
    .default(1),
  genderParameterCheckbox: z
    .boolean({
      required_error: 'Gender Parameter Checkbox Required!',
      invalid_type_error: 'Gender Parameter Checkbox Must Be A Boolean!',
    })
    .default(false),
  gender: z
    .number({
      required_error: 'Gender Parameter Required!',
      invalid_type_error: 'Gender Parameter Id Must Be A Number!',
    })
    .int()
    .transform((val) => JSON.stringify(val))
    .nullable()
    .transform((val) => (val === null ? 0 : val))
    .default(0),
  special_skillParameterCheckbox: z
    .boolean({
      required_error: 'Skill Parameter Checkbox Required!',
      invalid_type_error: 'Skill Parameter Checkbox Must Be A Boolean!',
    })
    .default(false),
  special_skill: z
    .array(z.union([z.number(), z.string()]))
    .nullable()
    .transform((val) => (val === null ? [] : val))
    .default([]),
  certificationParameterCheckbox: z
    .boolean({
      required_error: 'Certificate Parameter Checkbox Required!',
      invalid_type_error: 'Certificate Parameter Checkbox Must Be A Boolean!',
    })
    .default(false),
  certification: z
    .array(z.union([z.number(), z.string()]))
    .nullable()
    .transform((val) => (val === null ? [] : val))
    .default([]),
  jobVideoInterview: z.coerce
    .string({
      required_error: 'Job Video Interview Required!',
      invalid_type_error: 'Job Video Interview Must Be A String!',
    })
    .trim()
    .refine((val) => val === 'enable' || val === 'disable', {
      message: 'Job Video Interview Must Be Enable Or Disable!',
    }),
  jobAutoAssessment: z.coerce
    .string({
      required_error: 'Job Auto Assessment Required!',
      invalid_type_error: 'Job Auto Assessment Must Be A String!',
    })
    .trim()
    .refine((val) => val === 'enable' || val === 'disable', {
      message: 'Job Auto Assessment Must Be Enable Or Disable!',
    }),
  jobConfidential: z.coerce
    .string({
      required_error: 'Job Confidential Required!',
      invalid_type_error: 'Job Confidential Must Be A String!',
    })
    .trim()
    .refine((val) => val === 'yes' || val === 'no', {
      message: 'Job Confidential Must Be Yes Or No!',
    }),
  jobCareerFest: z.coerce
    .string({
      required_error: 'Job Career Fest Required!',
      invalid_type_error: 'Job Career Fest Must Be A String!',
    })
    .trim()
    .refine((val) => val === 'yes' || val === 'no', {
      message: 'Job Career Fest Must Be Yes Or No!',
    }),
  jobTaCollaborator: z
    .number({
      required_error: 'TA Collaborator Required!',
      invalid_type_error: 'TA Collaborator Id Must Be A Number!',
    })
    .array()
    .nullable()
    .transform((val) => (val === null ? [] : val))
    .default([]),
  jobUserCollaborator: z
    .number({
      required_error: 'User Collaborator Required!',
      invalid_type_error: 'User Collaborator Id Must Be A Number!',
    })
    .array()
    .nullable()
    .transform((val) => (val === null ? [] : val))
    .default([]),
});

export const validateJobVacancyId = z.object({
  // taId: z.coerce
  //   .number({
  //     required_error: 'TA id required!',
  //     invalid_type_error: 'TA id must be a number!',
  //   })
  //   .int(),
  jobVacancyId: z
    .number({
      required_error: 'Job Vacancy Id Required!',
      invalid_type_error: 'Job Vacancy Id Must Be A Number!',
    })
    .int(),
});

export const validateCandidateApply = z.object({
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

// export const validateJobVacancyIdAndStateName = z.object({
//   jobVacancyId: z
//     .number({
//       required_error: 'Job Vacancy Id Required!',
//       invalid_type_error: 'Job Vacancy Id Must Be A Number!',
//     })
//     .int(),
//   stateName: z.coerce
//     .string({
//       required_error: 'State Name Required!',
//       invalid_type_error: 'State Name Must Be A String!',
//     })
//     .trim()
//     .refine((val) => val === 'WAITING' || val === 'ASSESSMENT', {
//       message: 'State Name Must Be Waiting Or Assessment!',
//     }),
// });

// const validateJobVacancy = z.object({
//   id: z.coerce
//     .number({
//       required_error: 'Job vacancy id required!',
//       invalid_type_error: 'Job vacancy id must be a number!',
//     })
//     .int(),
//   jobEfpk: z.coerce
//     .string({
//       required_error: 'Job FPK required!',
//       invalid_type_error: 'Job FPK request no must be a string!',
//     })
//     .trim()
//     .min(1),
//   jobTitleCode: z.coerce
//     .string({
//       required_error: 'Job title code required!',
//       invalid_type_error: 'Job title code must be a string!',
//     })
//     .trim()
//     .min(1),
//   jobTitleAliases: z.coerce
//     .string({
//       required_error: 'Job title aliases required!',
//       invalid_type_error: 'Job title aliases must be a string!',
//     })
//     .trim()
//     .min(1),
//   jobFunctionId: z.coerce
//     .number({
//       required_error: 'Job function required!',
//       invalid_type_error: 'Job function id must be a number!',
//     })
//     .int(),
//   employementStatusName: z.coerce
//     .string({
//       required_error: 'Employment status required!',
//       invalid_type_error: 'Employment status name must be a string!',
//     })
//     .trim()
//     .min(1),
//   positionLevel: z.coerce
//     .number({
//       required_error: 'Position level required!',
//       invalid_type_error: 'Position level must be a number!',
//     })
//     .int(),
//   verticalCode: z.coerce
//     .string({
//       required_error: 'Vertical required!',
//       invalid_type_error: 'Vertical code must be a string!',
//     })
//     .trim()
//     .min(1),
//   organizationGroupCode: z.coerce
//     .string({
//       required_error: 'Department required!',
//       invalid_type_error:
//         'Department organization group code must be a string!',
//     })
//     .trim()
//     .min(1),
//   jobLineIndustry: z.coerce
//     .number({
//       required_error: 'Line industry required!',
//       invalid_type_error: 'Line industry id must be a number!',
//     })
//     .array(),
//   locationGroupCode: z.coerce
//     .string({
//       required_error: 'Region required!',
//       invalid_type_error: 'Region location group code must be a string!',
//     })
//     .trim()
//     .min(1),
//   locationCode: z.coerce
//     .string({
//       required_error: 'Work location required!',
//       invalid_type_error: 'Work location code must be a string!',
//     })
//     .trim()
//     .min(1),
//   createdAt: z.coerce
//     .date({
//       required_error: 'Created at date required!',
//       invalid_type_error: 'Created at date must be a date!',
//     })
//     .nullable(),
//   updatedAt: z.coerce
//     .date({
//       required_error: 'Updated at date required!',
//       invalid_type_error: 'Updated at date must be a date!',
//     })
//     .nullable(),
//   workLocationAddress: z.coerce
//     .string({
//       required_error: 'Work location address required!',
//       invalid_type_error: 'Work location address must be a string!',
//     })
//     .trim()
//     .min(1),
//   publishedDate: z.coerce.date({
//     required_error: 'Published date required!',
//     invalid_type_error: 'Published date must be a date!',
//   }),
//   expiredDate: z.coerce.date({
//     required_error: 'Expired date required!',
//     invalid_type_error: 'Expired date must be a date!',
//   }),
//   jobDescription: z.coerce
//     .string({
//       required_error: 'Job Description required!',
//       invalid_type_error: 'Job Description must be a string!',
//     })
//     .trim()
//     .min(1),
//   jobRequirement: z.coerce
//     .string({
//       required_error: 'Job Requirement required!',
//       invalid_type_error: 'Job Requirement must be a string!',
//     })
//     .trim()
//     .min(1),
//   ageParameterCheckbox: z.coerce
//     .boolean({
//       required_error: 'Age parameter checkbox required!',
//       invalid_type_error: 'Age parameter checkbox must be a boolean!',
//     })
//     .default(false),
//   ageParameter: z.coerce
//     .number({
//       required_error: 'Age parameter required!',
//       invalid_type_error: 'Age parameter must be a number!',
//     })
//     .int()
//     .gte(1)
//     .transform((val) => JSON.stringify(val))
//     .default(1),
//   genderParameterCheckbox: z.coerce
//     .boolean({
//       required_error: 'Gender parameter checkbox required!',
//       invalid_type_error: 'Gender parameter checkbox must be a boolean!',
//     })
//     .default(false),
//   genderParameter: z.coerce
//     .number({
//       required_error: 'Gender parameter required!',
//       invalid_type_error: 'Gender parameter id must be a number!',
//     })
//     .int()
//     .transform((val) => JSON.stringify(val))
//     .default(0),
//   skillParameterCheckbox: z.coerce
//     .boolean({
//       required_error: 'Skill parameter checkbox required!',
//       invalid_type_error: 'Skill parameter checkbox must be a boolean!',
//     })
//     .default(false),
//   skillParameter: z.array(z.union([z.number(), z.string()])).default([]),
//   certificateParameterCheckbox: z.coerce
//     .boolean({
//       required_error: 'Certificate parameter checkbox required!',
//       invalid_type_error: 'Certificate parameter checkbox must be a boolean!',
//     })
//     .default(false),
//   certificateParameter: z.array(z.union([z.number(), z.string()])).default([]),
//   isVideoInterview: z.coerce
//     .string({
//       required_error: 'Job video interview required!',
//       invalid_type_error: 'Job video interview must be a string!',
//     })
//     .trim()
//     .refine((val) => val === 'enable' || val === 'disable', {
//       message: 'Job video interview must be enable or disable!',
//     }),
//   isAutoAssessment: z.coerce
//     .string({
//       required_error: 'Job auto assessment required!',
//       invalid_type_error: 'Job auto assessment must be a string!',
//     })
//     .trim()
//     .refine((val) => val === 'enable' || val === 'disable', {
//       message: 'Job auto assessment must be enable or disable!',
//     }),
//   isConfidential: z.coerce
//     .string({
//       required_error: 'Job confidential required!',
//       invalid_type_error: 'Job confidential must be a string!',
//     })
//     .trim()
//     .refine((val) => val === 'yes' || val === 'no', {
//       message: 'Job confidential must be yes or no!',
//     }),
//   isCareerFest: z.coerce
//     .string({
//       required_error: 'Job career fest required!',
//       invalid_type_error: 'Job career fest must be a string!',
//     })
//     .trim()
//     .refine((val) => val === 'yes' || val === 'no', {
//       message: 'Job career fest must be yes or no!',
//     }),
//   taId: z.coerce.number({
//     required_error: 'TA id required!',
//     invalid_type_error: 'TA id must be a number!',
//   }),
//   jobTaCollaborator: z.coerce
//     .number({
//       required_error: 'TA collaborator required!',
//       invalid_type_error: 'TA collaborator must be a number!',
//     })
//     .array()
//     .default([]),
//   jobUserCollaborator: z.coerce
//     .number({
//       required_error: 'User collaborator required!',
//       invalid_type_error: 'User collaborator must be a number!',
//     })
//     .array()
//     .default([]),
// });
