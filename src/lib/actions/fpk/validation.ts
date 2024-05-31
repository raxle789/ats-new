import { z } from 'zod';

export const validateEfpkSchema = z.object({
  efpkRequestNo: z.coerce
    .string({
      required_error: 'Request No Required!',
      invalid_type_error: 'Request No Must Be A String!',
    })
    .trim(),
  taId: z
    .number({
      required_error: 'TA Required!',
      invalid_type_error: 'TA Id Must Be A Number!',
    })
    .int(),
});
