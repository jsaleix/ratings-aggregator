import z from "zod/v4";
import { ROLES } from "../../../core/auth/constants";

export const adminUpdateUserSchema = z.object({
    email: z.email().nonempty(),
    username: z.string().nonempty(),
    role: z.enum([ROLES.ADMIN, ROLES.MOD, ROLES.PREMIUM, ROLES.USER]),
});

export type AdminUpdateProfileType = z.infer<typeof adminUpdateUserSchema>;
