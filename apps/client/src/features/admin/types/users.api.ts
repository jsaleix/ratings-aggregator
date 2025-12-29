export type GetAllUsersResponse = GetOneFullResponse[];

export type GetOneFullResponse = {
    id: string;
    role: string;
    username: string;
    email: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    verified: boolean;
};
