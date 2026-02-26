import { Prisma, PrismaClient } from "../../../../generated/prisma";
import { MovieRepositoryI } from "../interfaces/repositories";
import { GenreType, MovieCreateInput, MovieType } from "../types/db";

class MockMovieRepository implements MovieRepositoryI {
    constructor(private db: PrismaClient) {}

    async createMovie(data: MovieCreateInput) {
        return await this.db.movie.create({ data, include: { Genre: true } });
    }

    async createOrUpdate(data: MovieCreateInput, genres: GenreType[]) {
        if (genres.length > 0) {
            data = {
                ...data,
                Genre: {
                    connect: genres.map((item) => ({ id: item.id })),
                },
            } as MovieCreateInput;
        }
        return await this.db.movie.upsert({
            where: { tmdb_id: data.tmdb_id },
            create: data,
            update: data,
            include: {
                Genre: true,
            },
        });
    }

    async getMovieBy(where: Prisma.MovieWhereInput): Promise<MovieType | null> {
        return await this.db.movie.findFirst({
            where,
            include: {
                Genre: true,
            },
        });
    }

    async updateMovie(id: string, data: Partial<MovieCreateInput>) {
        return await this.db.movie.update({
            where: { id },
            data,
            include: {
                Genre: true,
            },
        });
    }
}

export default MockMovieRepository;
