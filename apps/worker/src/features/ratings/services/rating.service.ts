import { PrismaClient, RatingUnit } from "../../../../generated/prisma";
import { RatingType } from "../types/db";

type RatingAttributesType = {
    movieId: string;
    value: string;
    rating_source: string;
    rating_unit: RatingUnit;
    sourceUrl?: string;
};

class RatingService {
    db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    async addOrUpdate(data: RatingAttributesType) {
        const { movieId, value, rating_source, rating_unit, sourceUrl } = data;
        const exists = await this.db.movie_Rating.findFirst({
            where: {
                movieId,
                rating_source,
            },
        });
        if (exists) {
            return await this.db.movie_Rating.update({
                where: { id: exists.id },
                data: { value, sourceUrl: sourceUrl ?? null },
            });
        } else {
            return await this.db.movie_Rating.create({
                data: {
                    movieId,
                    value,
                    rating_source,
                    rating_unit,
                    sourceUrl: sourceUrl ?? null,
                },
            });
        }
    }

    async getRatingsByMovieId(movieId: string): Promise<Array<RatingType>> {
        return await this.db.movie_Rating.findMany({
            where: {
                movieId,
            },
        });
    }
}

export default RatingService;
