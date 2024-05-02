import { z } from 'zod';

export const validateTaId = z.object({
  taId: z
    .number({
      required_error: 'TA required!',
      invalid_type_error: 'TA id must be a number!',
    })
    .int(),
});

export const validateRequestNo = z.object({
  requestNo: z.coerce
    .string({
      required_error: 'Request no required!',
      invalid_type_error: 'Request no must be a string!',
    })
    .trim(),
});

export const validateEfpk = z.object({
  RequestNo: z.coerce
    .string({
      required_error: 'Request no required!',
      invalid_type_error: 'Request no must be a string!',
    })
    .trim(),
  JobTitleCode: z.coerce
    .string({
      required_error: 'Job title code required!',
      invalid_type_error: 'Job title code must be a string!',
    })
    .trim(),
  EmpType: z.coerce
    .string({
      required_error: 'Employment type required!',
      invalid_type_error: 'Employment type must be a string!',
    })
    .trim(),
  JobLvlCode: z.coerce
    .string({
      required_error: 'Job level code required!',
      invalid_type_error: 'Job level code must be a string!',
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
            message: 'Job level code cannot parse to number!',
          });
        }

        return Number(isMatch);
      } else {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Job level code cannot parse to number!',
        });
      }
    }),
  OrgGroupName: z.coerce
    .string({
      required_error: 'Organization group name required!',
      invalid_type_error: 'Organization group name must be a string!',
    })
    .trim()
    .transform((val, ctx) => {
      const parsedValue = val.slice(0, val.indexOf(' '));

      if (parsedValue) {
        return parsedValue;
      } else {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Organization group name cannot be parsed!',
        });
      }
    }),
  OrgGroupCode: z.coerce
    .string({
      required_error: 'Organization group code required!',
      invalid_type_error: 'Organization group code must be a string!',
    })
    .trim(),
  LocationCode: z.coerce
    .string({
      required_error: 'Location code required!',
      invalid_type_error: 'Location code must be a string!',
    })
    .trim(),
  sla_days: z
    .number({
      required_error: 'SLA days required!',
      invalid_type_error: 'SLA days must be a number!',
    })
    .int(),
});

export const validateVerticalCode = z.object({
  verticalCode: z.coerce
    .string({
      required_error: 'Vertical code required!',
      invalid_type_error: 'Vertical code must be a string!',
    })
    .trim(),
});

export const validateJobVacancySchema = z.object({
  taId: z
    .number({
      required_error: 'Ta id required!',
      invalid_type_error: 'Ta id must be a number!',
    })
    .int(),
  jobEfpk: z.coerce
    .string({
      required_error: 'Job FPK required!',
      invalid_type_error: 'Job FPK request no must be a string!',
    })
    .trim()
    .min(1),
  jobTitle: z.coerce
    .string({
      required_error: 'Job title code required!',
      invalid_type_error: 'Job title code must be a string!',
    })
    .trim()
    .min(1),
  jobTitleAliases: z.coerce
    .string({
      required_error: 'Job title aliases required!',
      invalid_type_error: 'Job title aliases must be a string!',
    })
    .trim()
    .min(1),
  jobFunction: z
    .number({
      required_error: 'Job function required!',
      invalid_type_error: 'Job function id must be a number!',
    })
    .int(),
  jobEmploymentStatus: z.coerce
    .string({
      required_error: 'Employment status required!',
      invalid_type_error: 'Employment status name must be a string!',
    })
    .trim()
    .min(1),
  jobPositionLevel: z
    .number({
      required_error: 'Position level required!',
      invalid_type_error: 'Position level must be a number!',
    })
    .int(),
  jobVertical: z.coerce
    .string({
      required_error: 'Vertical required!',
      invalid_type_error: 'Vertical code must be a string!',
    })
    .trim()
    .min(1),
  jobDepartment: z.coerce
    .string({
      required_error: 'Department required!',
      invalid_type_error:
        'Department organization group code must be a string!',
    })
    .trim()
    .min(1),
  jobLineIndustry: z
    .number({
      required_error: 'Line industry required!',
      invalid_type_error: 'Line industry id must be a number!',
    })
    .array(),
  jobRegion: z.coerce
    .string({
      required_error: 'Region required!',
      invalid_type_error: 'Region location group code must be a string!',
    })
    .trim()
    .min(1),
  jobWorkLocation: z.coerce
    .string({
      required_error: 'Work location required!',
      invalid_type_error: 'Work location code must be a string!',
    })
    .trim()
    .min(1),
  jobWorkLocationAddress: z.coerce
    .string({
      required_error: 'Work location address required!',
      invalid_type_error: 'Work location address must be a string!',
    })
    .trim()
    .min(1),
  jobPublishedDateAndExpiredDate: z.coerce
    .date({
      required_error: 'Published date and expired date required!',
      invalid_type_error: 'Published date and expired date must be a date!',
    })
    .array()
    .length(2),
  jobDescription: z.coerce
    .string({
      required_error: 'Description required!',
      invalid_type_error: 'Description must be a string!',
    })
    .trim()
    .min(1),
  jobRequirement: z.coerce
    .string({
      required_error: 'Requirement required!',
      invalid_type_error: 'Requirement must be a string!',
    })
    .trim()
    .min(1),
  ageParameterCheckbox: z.coerce
    .boolean({
      required_error: 'Age parameter checkbox required!',
      invalid_type_error: 'Age parameter checkbox must be a boolean!',
    })
    .default(false),
  age: z
    .number({
      required_error: 'Age parameter required!',
      invalid_type_error: 'Age parameter must be a number!',
    })
    .int()
    .transform((val) => JSON.stringify(val))
    .nullable()
    .transform((val) => (val === null ? 1 : val))
    .default(1),
  genderParameterCheckbox: z.coerce
    .boolean({
      required_error: 'Gender parameter checkbox required!',
      invalid_type_error: 'Gender parameter checkbox must be a boolean!',
    })
    .default(false),
  gender: z
    .number({
      required_error: 'Gender parameter required!',
      invalid_type_error: 'Gender parameter id must be a number!',
    })
    .int()
    .transform((val) => JSON.stringify(val))
    .nullable()
    .transform((val) => (val === null ? 0 : val))
    .default(0),
  special_skillParameterCheckbox: z.coerce
    .boolean({
      required_error: 'Skill parameter checkbox required!',
      invalid_type_error: 'Skill parameter checkbox must be a boolean!',
    })
    .default(false),
  special_skill: z
    .array(z.union([z.number(), z.string()]))
    .nullable()
    .transform((val) => (val === null ? [] : val))
    .default([]),
  certificationParameterCheckbox: z.coerce
    .boolean({
      required_error: 'Certificate parameter checkbox required!',
      invalid_type_error: 'Certificate parameter checkbox must be a boolean!',
    })
    .default(false),
  certification: z
    .array(z.union([z.number(), z.string()]))
    .nullable()
    .transform((val) => (val === null ? [] : val))
    .default([]),
  jobVideoInterview: z.coerce
    .string({
      required_error: 'Job video interview required!',
      invalid_type_error: 'Job video interview must be a string!',
    })
    .trim()
    .refine((val) => val === 'enable' || val === 'disable', {
      message: 'Job video interview must be enable or disable!',
    }),
  jobAutoAssessment: z.coerce
    .string({
      required_error: 'Job auto assessment required!',
      invalid_type_error: 'Job auto assessment must be a string!',
    })
    .trim()
    .refine((val) => val === 'enable' || val === 'disable', {
      message: 'Job auto assessment must be enable or disable!',
    }),
  jobConfidential: z.coerce
    .string({
      required_error: 'Job confidential required!',
      invalid_type_error: 'Job confidential must be a string!',
    })
    .trim()
    .refine((val) => val === 'yes' || val === 'no', {
      message: 'Job confidential must be yes or no!',
    }),
  jobCareerFest: z.coerce
    .string({
      required_error: 'Job career fest required!',
      invalid_type_error: 'Job career fest must be a string!',
    })
    .trim()
    .refine((val) => val === 'yes' || val === 'no', {
      message: 'Job career fest must be yes or no!',
    }),
  jobTaCollaborator: z
    .number({
      required_error: 'Ta collaborator required!',
      invalid_type_error: 'Ta collaborator must be a number!',
    })
    .array()
    .nullable()
    .transform((val) => (val === null ? [] : val))
    .default([]),
  jobUserCollaborator: z
    .number({
      required_error: 'User collaborator required!',
      invalid_type_error: 'User collaborator must be a number!',
    })
    .array()
    .nullable()
    .transform((val) => (val === null ? [] : val))
    .default([]),
});

export const validateJobVacancyId = z.object({
  // taId: z.coerce
  //   .number({
  //     required_error: 'Ta id required!',
  //     invalid_type_error: 'Ta id must be a number!',
  //   })
  //   .int(),
  jobVacancyId: z
    .number({
      required_error: 'Job vacancy id required!',
      invalid_type_error: 'Job vacancy id must be a number!',
    })
    .int(),
});

export const validateCandidateApply = z.object({
  candidateId: z
    .number({
      required_error: 'Candidate id required!',
      invalid_type_error: 'Candidate id must be a number!',
    })
    .int(),
  jobVacancyId: z
    .number({
      required_error: 'Job vacancy id required!',
      invalid_type_error: 'Job vacancy id must be a number!',
    })
    .int(),
});

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
//     required_error: 'Ta id required!',
//     invalid_type_error: 'Ta id must be a number!',
//   }),
//   jobTaCollaborator: z.coerce
//     .number({
//       required_error: 'Ta collaborator required!',
//       invalid_type_error: 'Ta collaborator must be a number!',
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
