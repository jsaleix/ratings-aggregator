import { PrismaClient } from "../../../../generated/prisma";
import { RATING_SOURCERS, RATING_UNITS } from "../../../config/ratings";
import { getRottenTomatoesScores } from "../providers/rotten";

class RatingService {
    db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    async setRottenRatings(movieId: string, name: string) {
        const values = await getRottenTomatoesScores(name);
        if (!values) {
            throw new Error(`Rotten Tomatoes rating for ${name} not found`);
        }
        const { criticsRatings, audienceRatings } = values;

        let criticsRating = undefined;
        let audienceRating = undefined;

        // CRITICS
        const rottenRatingExists = await this.db.movie_Rating.findFirst({
            where: {
                movieId,
                rating_source: RATING_SOURCERS.ROTTEN_TOMATOES,
            },
        });

        // If it exists we update it
        if (rottenRatingExists) {
            criticsRating = await this.db.movie_Rating.update({
                where: { id: rottenRatingExists.id },
                data: { value: criticsRatings },
            });
        } else {
            // If it does not exist we create it
            criticsRating = await this.db.movie_Rating.create({
                data: {
                    movieId,
                    rating_source: RATING_SOURCERS.ROTTEN_TOMATOES,
                    value: criticsRatings,
                    rating_unit: RATING_UNITS.PERCENTAGE,
                },
            });
        }

        // AUDIENCE
        const rottenAudienceRatingExists = await this.db.movie_Rating.findFirst(
            {
                where: {
                    movieId,
                    rating_source: RATING_SOURCERS.ROTTEN_TOMATOES_AUDIENCE,
                },
            }
        );
        // If it exists we update it
        if (rottenAudienceRatingExists) {
            audienceRating = await this.db.movie_Rating.update({
                where: { id: rottenAudienceRatingExists.id },
                data: { value: audienceRatings },
            });
        } else {
            audienceRating = await this.db.movie_Rating.create({
                data: {
                    movieId,
                    rating_source: RATING_SOURCERS.ROTTEN_TOMATOES_AUDIENCE,
                    value: audienceRatings,
                    rating_unit: RATING_UNITS.PERCENTAGE,
                },
            });
        }

        return {
            criticsRating,
            audienceRating,
        };
    }
}

export default RatingService;
