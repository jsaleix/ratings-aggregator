import { PrismaClient } from "../../../../generated/prisma";
import { RatingRepositoryI } from "../interfaces/repositories";
import { RatingType } from "../types/db";
import { RatingAttributesType } from "../types/rating";

class MockRatingRepository implements RatingRepositoryI {
    constructor(private db: PrismaClient) {}

    async addOrUpdate(data: RatingAttributesType) {
        const { movieId, value, rating_source, rating_unit, source_url } = data;
        const exists = await this.db.movie_Rating.findFirst({
            where: {
                movieId,
                rating_source,
            },
        });
        if (exists) {
            return await this.db.movie_Rating.update({
                where: { id: exists.id },
                data: { value, source_url: source_url ?? null },
            });
        } else {
            return await this.db.movie_Rating.create({
                data: {
                    movieId,
                    value,
                    rating_source,
                    rating_unit,
                    source_url: source_url ?? null,
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

export default MockRatingRepository;
