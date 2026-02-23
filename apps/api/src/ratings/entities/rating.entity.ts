import { Prisma } from 'generated/prisma/client';

export const movieRatingSelect = {
  id: true,
  movieId: true,
  extra: true,
  source_url: true,
  created_at: true,
  updated_at: true,
  Rating_Source: true,
} satisfies Prisma.Movie_RatingSelect;

export type MovieRatingType = Prisma.Movie_RatingGetPayload<{
  select: typeof movieRatingSelect;
}>;
