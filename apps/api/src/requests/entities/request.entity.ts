import { Prisma } from 'generated/prisma/client';
import { userPublicSelect } from 'src/users/entities/user.entity';

export const movieRequestSelect = {
  id: true,
  tmdb_id: true,
  created_at: true,
  processed: true,
} satisfies Prisma.Movie_RequestSelect;

export const movieRequestAdminSelect = {
  id: true,
  tmdb_id: true,
  created_at: true,
  processed: true,
  User: {
    select: userPublicSelect,
  },
} satisfies Prisma.Movie_RequestSelect;

export type MovieRequestPublicType = Prisma.Movie_RequestGetPayload<{
  select: typeof movieRequestSelect;
}>;

export type MovieRequestAdminType = Prisma.Movie_RequestGetPayload<{
  select: typeof movieRequestAdminSelect;
}>;
