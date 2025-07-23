import { z } from "zod/v4";

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().nonempty(),
});

export const signupSchema = z
    .object({
        email: z.email(),
        password: z
            .string()
            .min(6)
            .max(20)
            .refine((password) => /[A-Z]/.test(password), {
                message:
                    "Your password must include a least 1 uppercase character",
            })
            .refine((password) => /[a-z]/.test(password), {
                message:
                    "Your password must include a least 1 lowercase character",
            })
            .refine((password) => /[0-9]/.test(password), {
                message: "Your password must include a least 1 digit",
            }),
        password_confirmation: z.string().nonempty(),
        gcu: z
            .boolean()
            .refine((v) => v === true, { message: "Please accept the CGU" }),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords must match",
    });

export type LoginType = z.infer<typeof loginSchema>;
export type SignupType = z.infer<typeof signupSchema>;
