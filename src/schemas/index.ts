import { z } from "zod";

export const LoginSchema = z
    .object({
        email: z.string().email(),
        password: z.string().min(4).max(100),
    })
    .required();

export type Login = z.infer<typeof LoginSchema>;
