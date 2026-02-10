import { Prisma, PrismaClient } from "../../../../generated/prisma";
import { MovieRepositoryI } from "../interfaces/repositories";
import { MovieCreateInput, MovieType } from "../types/db";

class MockMovieRepository implements MovieRepositoryI {
    constructor(private db: PrismaClient) {}

    async createMovie(data: MovieCreateInput) {
        return await this.db.movie.create({ data });
    }

    async createOrUpdate(data: MovieCreateInput) {
        return await this.db.movie.upsert({
            where: { tmdbId: data.tmdbId },
            create: data,
            update: data,
        });
    }

    async getMovieBy(where: Prisma.MovieWhereInput): Promise<MovieType | null> {
        const movie = await this.db.movie.findFirst({
            where,
        });

        return movie ? movie : null;
    }

    async updateMovie(id: string, data: Partial<MovieCreateInput>) {
        return await this.db.movie.update({
            where: { id },
            data,
        });
    }
}

export default MockMovieRepository;
