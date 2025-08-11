import { Prisma } from "../../../../generated/prisma";

const movieRatingSummaryModel =
    Prisma.validator<Prisma.Movie_Ratings_SummaryDefaultArgs>()({
        select: {
            id: true,
            content: true,
            movieId: true,
            created_at: true,
            updated_at: true,
        },
    });

export type MovieRatingSummaryType = Prisma.Movie_Ratings_SummaryGetPayload<
    typeof movieRatingSummaryModel
>;
