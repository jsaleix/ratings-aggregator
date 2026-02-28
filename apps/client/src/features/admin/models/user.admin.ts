import type { RoleType } from "../../../core/auth/constants";
import type { ApiAdminUserType } from "../types/users.api";

export type UserAdminModel = {
    id: string;
    username: string;
    created_at: string;
    deleted_at: string;
    email: string;
    verified: boolean;
    role: RoleType;
};

export function mapAdminUserApiToModel(data: ApiAdminUserType) {
    return data as UserAdminModel;
}
