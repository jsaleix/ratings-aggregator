import type { RoleType } from "../../../core/auth/constants";

export type UserType = {
    id: string;
    role: RoleType;
    username: string;
    email: string;
    created_at: string;
    verified: boolean;
};

export type SignupReturnType = UserType;
