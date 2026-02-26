import { PrismaClient } from "../../../../generated/prisma";
import { RatingRepositoryI } from "../interfaces/repositories";
import { movieRatingSelect, MovieRatingType } from "../types/db";
import {
    CreateRatingAttributesType,
    RatingCollectorResult,
} from "../types/rating";

class MockRatingRepository implements RatingRepositoryI {
    constructor(private db: PrismaClient) {}

    async addOrUpdate(data: CreateRatingAttributesType) {
        const { movieId, value, rating_source_id, source_url } = data;

        return await this.db.movie_Rating.upsert({
            where: { id: movieId, rating_source_id },
            create: { movieId, rating_source_id, value, source_url },
            update: { value, source_url },
            select: movieRatingSelect,
        });
    }

    async getRatingsByMovieId(
        movieId: string,
    ): Promise<Array<MovieRatingType>> {
        return await this.db.movie_Rating.findMany({
            where: {
                movieId,
            },
            select: movieRatingSelect,
        });
    }

    async setAllForMovie(
        _: string,
        __: RatingCollectorResult[],
    ): Promise<MovieRatingType[]> {
        return [] satisfies MovieRatingType[];
    }
}

export default MockRatingRepository;
