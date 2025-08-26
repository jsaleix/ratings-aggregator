import { PrismaClient } from "../../../../generated/prisma";

export class DBService {
    constructor(private prisma: PrismaClient) {}

    async saveSummary({
        movieId,
        content,
        score,
    }: {
        movieId: string;
        content: string;
        score: string;
    }) {
        return await this.prisma.movie_Ratings_Summary.upsert({
            where: { movieId },
            update: { content, score},
            create: { movieId, content, score },
        });
    }

    async getRatingsByMovieId(movieId: string) {
        return await this.prisma.movie_Rating.findMany({ where: { movieId } });
    }
}
