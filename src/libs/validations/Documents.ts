import { z } from 'zod';

const FILEPROPS = z.object({
  original_name: z.string({ required_error: 'cok' }),
  byte_size: z.number(),
  file_base: z.string(),
});

export const Documents = z.object({
  bankAccountNumber: z.string().max(32).optional(),
  idNumber: z.string().max(32).optional(),
  kkNumber: z.string().max(16).optional(),
  npwpNumber: z.string().max(32).optional(),
  bankAccount: FILEPROPS.refine(
    (value) => (value?.byte_size as number) < 512000,
    { message: 'Your file must less than 512KB' },
  ).optional(),
  healthCertificate: FILEPROPS.refine(
    (value) => (value?.byte_size as number) < 512000,
    { message: 'Your file must less than 512KB' },
  ).optional(),
  mcu: FILEPROPS.optional()
    .refine((value) => (value?.byte_size as number) < 512000, {
      message: 'Your file must less than 512KB',
    })
    .optional(),
  idFile: FILEPROPS.refine((value) => (value?.byte_size as number) < 512000, {
    message: 'Your file must less than 512KB',
  }).optional(),
  kk: FILEPROPS.refine((value) => (value?.byte_size as number) < 512000, {
    message: 'Your file must less than 512KB',
  }).optional(),
  latestEducation: FILEPROPS.refine(
    (value) => (value?.byte_size as number) < 512000,
    { message: 'Your file must less than 512KB' },
  ).optional(),
  npwp: FILEPROPS.refine((value) => (value?.byte_size as number) < 512000, {
    message: 'Your file must less than 512KB',
  }).optional(),
  uploadCV: FILEPROPS.refine((value) => (value?.byte_size as number) < 512000, {
    message: 'Your file must less than 512KB',
  }).optional(),
  vaccineCertificate: FILEPROPS.refine(
    (value) => (value?.byte_size as number) < 512000,
    { message: 'Your file must less than 512KB' },
  ).optional(),
});
