import { Prisma } from "../../../../generated/prisma";

export const movieRatingsSummarySelect = {
    id: true,
    content: true,
    movieId: true,
    created_at: true,
    updated_at: true,
    score: true,
};

export type MovieRatingsSummaryType = Prisma.Movie_Ratings_SummaryGetPayload<{
    select: typeof movieRatingsSummarySelect;
}>;
