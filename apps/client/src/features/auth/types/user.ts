export type UserType = {
    id: string;
    role: string;
    username: string;
    email: string;
    created_at: string;
    verified: boolean;
};

export type SignupReturnType = UserType;
