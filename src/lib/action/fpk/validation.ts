import { z } from 'zod';

export const validateEfpkSchema = z.object({
  efpkRequestNo: z.coerce
    .string({
      required_error: 'Request no required!',
      invalid_type_error: 'Request no must be a string!',
    })
    .trim(),
  taId: z.coerce
    .number({
      required_error: 'TA required!',
      invalid_type_error: 'TA id must be a number!',
    })
    .int(),
});
