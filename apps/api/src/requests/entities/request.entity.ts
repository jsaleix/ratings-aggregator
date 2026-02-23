import { Prisma } from 'generated/prisma/client';

export const movieRequestSelect = {
  id: true,
  tmdb_id: true,
  title: true,
  created_at: true,
  processed: true,
} satisfies Prisma.Movie_RequestSelect;

export const movieRequestAdminSelect = {
  id: true,
  tmdb_id: true,
  title: true,
  created_at: true,
  processed: true,
  User: true,
} satisfies Prisma.Movie_RequestSelect;

export type MovieRequestPublicType = Prisma.Movie_RequestGetPayload<{
  select: typeof movieRequestSelect;
}>;

export type MovieRequestAdminType = Prisma.Movie_RequestGetPayload<{
  select: typeof movieRequestAdminSelect;
}>;
