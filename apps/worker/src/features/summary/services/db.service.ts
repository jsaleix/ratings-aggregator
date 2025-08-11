import { PrismaClient } from "../../../../generated/prisma";

export class DBService {
    constructor(private prisma: PrismaClient) {}

    async saveSummary({
        movieId,
        content,
    }: {
        movieId: string;
        content: string;
    }) {
        return await this.prisma.movie_Ratings_Summary.upsert({
            where: { movieId },
            update: { content },
            create: { movieId, content },
        });
    }

    async getRatingsByMovieId(movieId: string) {
        return await this.prisma.movie_Rating.findMany({ where: { movieId } });
    }
}
