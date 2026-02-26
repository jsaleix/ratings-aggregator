import { PrismaClient } from "../../../../generated/prisma";
import { db } from "../../../core/db";
import { movieRatingSelect, MovieRatingType } from "../../ratings/types/db";
import { SummaryRepositoryI } from "../interfaces/repositories";
import { movieRatingsSummarySelect } from "../types/db";

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
            select: movieRatingsSummarySelect,
        });
    }

    async getRatingsByMovieId(movieId: string): Promise<MovieRatingType[]> {
        return (await this.db.movie_Rating.findMany({
            where: { movieId },
            select: movieRatingSelect,
        })) satisfies MovieRatingType[];
    }
}
