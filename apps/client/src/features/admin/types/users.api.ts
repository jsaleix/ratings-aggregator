export type GetAllUsersResponse = ApiAdminUserType[];

export type ApiAdminUserType = {
    id: string;
    role: string;
    username: string;
    email: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    verified: boolean;
};
