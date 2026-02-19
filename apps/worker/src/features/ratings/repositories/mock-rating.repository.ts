import { PrismaClient } from "../../../../generated/prisma";
import { RatingRepositoryI } from "../interfaces/repositories";
import { RatingType } from "../types/db";
import { CreateRatingAttributesType } from "../types/rating";

class MockRatingRepository implements RatingRepositoryI {
    constructor(private db: PrismaClient) {}

    async addOrUpdate(data: CreateRatingAttributesType) {
        const { movieId, value, rating_source_id, source_url } = data;

        return await this.db.movie_Rating.upsert({
            where: { id: movieId, rating_source_id },
            create: { movieId, rating_source_id, value, source_url },
            update: { value, source_url },
        });
    }

    async getRatingsByMovieId(movieId: string): Promise<Array<RatingType>> {
        return await this.db.movie_Rating.findMany({
            where: {
                movieId,
            },
        });
    }
}

export default MockRatingRepository;
