import * as z from 'zod';

export const emailTriggerFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  condition_type: z.number().int().min(0).max(2),
  email_subject: z.string().min(1, 'Email subject is required'),
  email_body: z.string().min(1, 'Email body is required'),
  days_offset: z.number().int().min(1, 'Days offset must be at least 1'),
  isactive: z.boolean(),
});

export type EmailTriggerFormInput = z.infer<typeof emailTriggerFormSchema>;