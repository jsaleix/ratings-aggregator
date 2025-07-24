export const roles = {
  ADMIN: 'admin',
  USER: 'user',
  MOD: 'mod',
} as const;

export const rolesValues = Object.values(roles);

export type RoleType = (typeof roles)[keyof typeof roles];
