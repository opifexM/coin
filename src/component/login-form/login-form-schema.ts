import {z} from "zod";

export const LoginFormSchema = z.object({
  login: z.string().min(6, 'Login must be at least 6 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});
export type LoginForm = z.infer<typeof LoginFormSchema>;
