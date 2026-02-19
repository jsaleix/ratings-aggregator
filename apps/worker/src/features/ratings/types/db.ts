import { Prisma, RatingUnit } from "../../../../generated/prisma";

const ratingModel = Prisma.validator<Prisma.Movie_RatingDefaultArgs>()({
    select: {
        id: true,
        movieId: true,
        value: true,
        extra: true,
        created_at: true,
        updated_at: true,
        source_url: true,
    },
});

export type RatingSource = {
    id: string;
    code: string;
    name: string;
    rating_unit: RatingUnit;
    url: string;
    country_code: string;
};

// FullRatingType includes the Rating_Source
export type FullRatingType = {
    id: string;
    movieId: string;
    value: string;
    extra: string;
    created_at: Date;
    updated_at: Date;
    source_url: string | null;
    Rating_Source: RatingSource;
};

export type RatingType = Prisma.Movie_RatingGetPayload<typeof ratingModel>;
