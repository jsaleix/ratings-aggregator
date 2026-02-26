import { Prisma, PrismaClient } from "../../../../generated/prisma";
import { db } from "../../../core/db";
import { MovieRepositoryI } from "../interfaces/repositories";
import {
    GenreType,
    MovieCreateInput,
    movieSelect,
    MovieType,
} from "../types/db";

class PrismaMovieRepository implements MovieRepositoryI {
    db: PrismaClient;

    constructor() {
        this.db = db;
    }

    async createMovie(data: MovieCreateInput) {
        return await this.db.movie.create({ data, select: movieSelect });
    }

    async createOrUpdate(data: MovieCreateInput, genres: GenreType[]) {
        data = {
            ...data,
            Genre: {
                connect: genres.map((item) => ({ id: item.id })),
            },
        } as MovieCreateInput;

        return await this.db.movie.upsert({
            where: { tmdb_id: data.tmdb_id },
            create: data,
            update: data,
            select: movieSelect,
        });
    }

    async getMovieBy(where: Prisma.MovieWhereInput): Promise<MovieType | null> {
        return await this.db.movie.findFirst({
            where,
            select: movieSelect,
        });
    }

    async updateMovie(id: string, data: Partial<MovieCreateInput>) {
        return await this.db.movie.update({
            where: { id },
            data,
            select: movieSelect,
        });
    }
}

export default PrismaMovieRepository;
