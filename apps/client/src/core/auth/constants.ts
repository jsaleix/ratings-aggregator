export const ROLES = {
    ADMIN: "admin",
    USER: "user",
    MOD: "mod",
    PREMIUM: "premium",
} as const;

export const rolesValues = Object.values(ROLES);

export type RoleType = (typeof ROLES)[keyof typeof ROLES];
