import { Prisma } from "../../../../generated/prisma";

const movieWithRatingsModel = Prisma.validator<Prisma.MovieDefaultArgs>()({
    include: {
        Movie_Rating: true,
        Genre: true,
    },
});

const movieModel = Prisma.validator<Prisma.MovieDefaultArgs>()({
    select: {
        id: true,
        title: true,
        original_title: true,
        language: true,
        created_at: true,
        tmdb_id: true,
        tag_line: true,
        summary: true,
        runtime: true,
        release_date: true,
        year: true,
        budget: true,
        poster_path: true,
        updated_at: true,
        imdb_id: true,
        slug: true,
    },
    include: {
        Genre: true,
    },
});

export type MovieType = Prisma.MovieGetPayload<typeof movieModel>;
export type MovieWithRatingsType = Prisma.MovieGetPayload<
    typeof movieWithRatingsModel
>;
export type MovieCreateInput = Omit<Prisma.MovieCreateInput, "Genre">;

export type GenreCreateInput = Prisma.GenreCreateInput;

export type GenreType = Prisma.GenreGetPayload<{ omit: {} }>;
