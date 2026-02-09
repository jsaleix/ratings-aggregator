import { PrismaClient } from "../../../../generated/prisma";
import { db } from "../../../core/db";
import { SummaryRepositoryI } from "../interfaces/repositories";

export class PrismaSummaryRepository implements SummaryRepositoryI {
    db: PrismaClient;

    constructor() {
        this.db = db;
    }

    async saveSummary({
        movieId,
        content,
        score,
    }: {
        movieId: string;
        content: string;
        score: string;
    }) {
        return await this.db.movie_Ratings_Summary.upsert({
            where: { movieId },
            update: { content, score },
            create: { movieId, content, score },
        });
    }

    async getRatingsByMovieId(movieId: string) {
        return await this.db.movie_Rating.findMany({ where: { movieId } });
    }
}
