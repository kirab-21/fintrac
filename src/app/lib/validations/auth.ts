import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be Atleast 2 Character"),
  email: z.email("Enter a valid Email"),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6),
})
