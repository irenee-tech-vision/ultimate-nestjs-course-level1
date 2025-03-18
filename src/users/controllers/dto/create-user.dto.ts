import { z } from 'zod';

export const createUserSchema = z.object({
  username: z.string().nonempty(),
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  dateOfBirth: z.coerce.date().optional(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
