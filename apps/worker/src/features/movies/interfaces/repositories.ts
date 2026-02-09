import { Prisma } from "../../../../generated/prisma";
import { MovieCreateInput, MovieType } from "../types/db";

export interface MovieRepositoryI {
    createMovie(data: MovieCreateInput): Promise<MovieType>;
    createOrUpdate(data: MovieCreateInput): Promise<MovieType>;
    getMovieBy(where: Prisma.MovieWhereInput): Promise<MovieType | null>;
    updateMovie(
        id: string,
        data: Partial<MovieCreateInput>,
    ): Promise<MovieType | null>;
}
