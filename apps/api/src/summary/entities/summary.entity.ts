import { Prisma } from 'generated/prisma/client';

export const movieRatingsSummarySelect = {
  id: true,
  content: true,
  score: true,
  score_value: true,
  movieId: true,
  created_at: true,
  updated_at: true,
} satisfies Prisma.Movie_Ratings_SummarySelect;

export type MovieRatingsSummaryType = Prisma.Movie_Ratings_SummaryGetPayload<{
  select: typeof movieRatingsSummarySelect;
}>;
