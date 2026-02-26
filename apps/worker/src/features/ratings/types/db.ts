import { Prisma, RatingUnit } from "../../../../generated/prisma";

// Rating Source

export const ratingSourceSelect = {
    id: true,
    code: true,
    name: true,
    rating_unit: true,
    url: true,
    country_code: true,
} satisfies Prisma.Rating_SourceSelect;


export type RatingSourceType = Prisma.Rating_SourceGetPayload<{
    select: typeof ratingSourceSelect;
}>;

// Movie Rating
export const movieRatingSelect = {
    id: true,
    movieId: true,
    value: true,
    extra: true,
    created_at: true,
    updated_at: true,
    source_url: true,
    Rating_Source: true
} satisfies Prisma.Movie_RatingSelect;

export type MovieRatingType = Prisma.Movie_RatingGetPayload<{
    select: typeof movieRatingSelect;
}>;
