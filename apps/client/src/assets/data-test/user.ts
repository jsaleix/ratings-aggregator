import type { UserType } from "../../features/auth/types/user";

export const mockUserProfile = {
    id: "1",
    email: "john.doe@gmail.com",
    role: "user",
    username: "JohnDo",
    created_at: new Date().toDateString(),
    verified: false,
} satisfies UserType;
