import { Prisma } from "../../../../generated/prisma";

const ratingModel = Prisma.validator<Prisma.Movie_RatingDefaultArgs>()({
    select: {
        id: true,
        movieId: true,
        ratingSource: true,
        value: true,
        ratingUnit: true,
        extra: true,
        createdAt: true,
        updatedAt: true,
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
