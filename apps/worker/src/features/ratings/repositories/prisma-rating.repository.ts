import { PrismaClient } from "../../../../generated/prisma";
import { db } from "../../../core/db";
import { RatingRepositoryI } from "../interfaces/repositories";
import {
    RatingSourceServiceI,
} from "../interfaces/services";
import { FullRatingType, RatingType } from "../types/db";
import { CreateRatingAttributesType, RatingCollectorResult } from "../types/rating";

class PrismaRatingRepository implements RatingRepositoryI {
    db: PrismaClient;

    constructor(private ratingSourceService: RatingSourceServiceI) {
        this.db = db;
    }

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
            include: {
                Rating_Source: true,
            },
        });
    }

    async setAllForMovie(
        movieId: string,
        ratings: RatingCollectorResult[],
    ): Promise<FullRatingType[]> {
        const added: FullRatingType[] = [];
        await this.db.movie_Rating.deleteMany({ where: { movieId } });
        for (let rating of ratings) {
            const source = await this.ratingSourceService.getRatingSourceId(
                rating.rating_source_code,
            );
            const newRating = await this.db.movie_Rating.create({
                data: {
                    movieId,
                    rating_source_id: source,
                    value: rating.value,
                    source_url: rating.source_url,
                    extra: rating.extra,
                },
                include: { Rating_Source: true },
            });
            added.push(newRating);
        }
        return added;
    }
}

export default PrismaRatingRepository;
