import { Prisma } from "../../../../generated/prisma";
import {
    GenreCreateInput,
    GenreType,
    MovieCreateInput,
    MovieType,
} from "../types/db";

export interface MovieRepositoryI {
    createMovie(data: MovieCreateInput): Promise<MovieType>;
    createOrUpdate(
        data: MovieCreateInput,
        genre: GenreType[],
    ): Promise<MovieType>;
    getMovieBy(where: Prisma.MovieWhereInput): Promise<MovieType | null>;
    updateMovie(
        id: string,
        data: Partial<MovieCreateInput>,
    ): Promise<MovieType | null>;
}

export interface GenreRepositoryI {
    createOrUpdateGenre(data: GenreCreateInput): Promise<GenreType>;
}
