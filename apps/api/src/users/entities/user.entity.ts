import { Prisma } from 'generated/prisma/client';

export const userPublicSelect = {
  id: true,
  username: true,
} satisfies Prisma.UserSelect;

export const userPrivateSelect = {
  id: true,
  username: true,
  email: true,
  role: true,
  created_at: true,
  verified: true,
  deleted_at: true,
} satisfies Prisma.UserSelect;

export type UserPublicType = Prisma.UserGetPayload<{
  select: typeof userPublicSelect;
}>;

export type UserPrivateType = Prisma.UserGetPayload<{
  select: typeof userPrivateSelect;
}>;

export type FullUserWithPasswordType = Prisma.UserGetPayload<object>;
