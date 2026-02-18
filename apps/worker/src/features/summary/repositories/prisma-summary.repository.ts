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
        scoreValue,
    }: {
        movieId: string;
        content: string;
        scoreValue: number;
    }) {
        return await this.db.movie_Ratings_Summary.upsert({
            where: { movieId },
            update: { content, score_value: scoreValue },
            create: { movieId, content, score_value: scoreValue },
        });
    }

    async getRatingsByMovieId(movieId: string) {
        return await this.db.movie_Rating.findMany({ where: { movieId } });
    }
}
