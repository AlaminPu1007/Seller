import { z } from 'zod';

export const SignInSchema = z.object({
  countryCode: z.string().min(1, 'Select a country code'),
  phoneNumber: z
    .string()
    .regex(/^[0-9]{10}$/, 'Enter a valid 10-digit phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  remember: z.boolean().optional(),
  isSubmit: z.boolean().optional()
});

export const InitialValue = {
  countryCode: '+880',
  phoneNumber: '1956465465',
  password: '123456',
  isSubmit: false
};

export type SignInData = z.infer<typeof SignInSchema>;
