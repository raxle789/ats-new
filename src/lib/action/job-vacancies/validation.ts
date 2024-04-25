import { z } from 'zod';

export const validateTaId = z.object({
  taId: z.coerce
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
  sla_days: z.coerce
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
  jobFunction: z.coerce
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
  jobPositionLevel: z.coerce
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
  jobLineIndustry: z.coerce
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
  ageParameter: z.coerce
    .number({
      required_error: 'Age parameter required!',
      invalid_type_error: 'Age parameter must be a number!',
    })
    .int()
    .gte(1)
    .transform((val) => JSON.stringify(val))
    .default(1),
  genderParameterCheckbox: z.coerce
    .boolean({
      required_error: 'Gender parameter checkbox required!',
      invalid_type_error: 'Gender parameter checkbox must be a boolean!',
    })
    .default(false),
  genderParameter: z.coerce
    .number({
      required_error: 'Gender parameter required!',
      invalid_type_error: 'Gender parameter id must be a number!',
    })
    .int()
    .transform((val) => JSON.stringify(val))
    .default(0),
  skillParameterCheckbox: z.coerce
    .boolean({
      required_error: 'Skill parameter checkbox required!',
      invalid_type_error: 'Skill parameter checkbox must be a boolean!',
    })
    .default(false),
  skillParameter: z.array(z.union([z.number(), z.string()])).default([]),
  certificateParameterCheckbox: z.coerce
    .boolean({
      required_error: 'Certificate parameter checkbox required!',
      invalid_type_error: 'Certificate parameter checkbox must be a boolean!',
    })
    .default(false),
  certificateParameter: z.array(z.union([z.number(), z.string()])).default([]),
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
  jobTaCollaborator: z.coerce
    .number({
      required_error: 'Ta collaborator required!',
      invalid_type_error: 'Ta collaborator must be a number!',
    })
    .array()
    .default([]),
  jobUserCollaborator: z.coerce
    .number({
      required_error: 'User collaborator required!',
      invalid_type_error: 'User collaborator must be a number!',
    })
    .array()
    .default([]),
});
