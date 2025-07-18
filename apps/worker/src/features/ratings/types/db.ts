import { Prisma } from "../../../../generated/prisma";

const ratingModel = Prisma.validator<Prisma.Movie_RatingDefaultArgs>()({
    select: {
        id: true,
        movieId: true,
        rating_source: true,
        value: true,
        rating_unit: true,
        extra: true,
        created_at: true,
        updated_at: true,
    },
});

const ratingWithMovieModel = Prisma.validator<Prisma.Movie_RatingDefaultArgs>()(
    {
        include: {
            Movie: {
                select: {
                    id: true,
                    title: true,
                    tmdbId: true,
                },
            },
        },
    }
);

export type RatingType = Prisma.Movie_RatingGetPayload<typeof ratingModel>;
export type RatingWithMovieType = Prisma.Movie_RatingGetPayload<
    typeof ratingWithMovieModel
>;
