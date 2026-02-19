import { Prisma, RatingUnit } from "../../../../generated/prisma";

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
        source_url: true,
    },
});

export type FullRatingType = {
    id: string;
    movieId: string;
    value: string;
    extra: string;
    created_at: Date;
    updated_at: Date;
    source_url: string | null;
    Rating_Source: {
        id: string;
        code: string;
        name: string;
        rating_unit: string;
        url: string;
        country_code: string;
    } | null;
};

const ratingWithMovieModel = Prisma.validator<Prisma.Movie_RatingDefaultArgs>()(
    {
        include: {
            Movie: {
                select: {
                    id: true,
                    title: true,
                    tmdb_id: true,
                },
            },
            Rating_Source: true,
        },
    },
);

export type RatingSource = {
    id: string;
    code: string;
    name: string;
    rating_unit: RatingUnit;
    country_code: string;
};

export type RatingType = Prisma.Movie_RatingGetPayload<typeof ratingModel>;
export type RatingWithMovieType = Prisma.Movie_RatingGetPayload<
    typeof ratingWithMovieModel
>;
