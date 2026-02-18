import { Prisma } from "../../../../generated/prisma";

const movieWithPostsModel = Prisma.validator<Prisma.MovieDefaultArgs>()({
    include: {
        Movie_Rating: true,
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
    },
});

export type MovieType = Prisma.MovieGetPayload<typeof movieModel>;
export type MovieWithRatingsType = Prisma.MovieGetPayload<
    typeof movieWithPostsModel
>;
export type MovieCreateInput = Prisma.MovieCreateInput;
