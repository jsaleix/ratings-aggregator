import { PrismaClient, RatingUnit } from "../../../../generated/prisma";
import { RATING_SOURCERS, RATING_UNITS } from "../../../config/ratings";
import { MovieType } from "../../movies/types/db";
import { getRottenTomatoesScores } from "../providers/rotten";

type RatingAttributesType = {
    movieId: string;
    value: string;
    rating_source: string;
    rating_unit: RatingUnit;
};

class RatingService {
    db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    private async addOrCreateRating(data: RatingAttributesType) {
        const { movieId, value, rating_source, rating_unit } = data;
        const exists = await this.db.movie_Rating.findFirst({
            where: {
                movieId,
                rating_source,
            },
        });
        if (exists) {
            return await this.db.movie_Rating.update({
                where: { id: exists.id },
                data: { value },
            });
        } else {
            return await this.db.movie_Rating.create({
                data: {
                    movieId,
                    value,
                    rating_source,
                    rating_unit,
                },
            });
        }
    }

    async setRottenRatings(movie: MovieType) {
        const { title, id: movieId, year } = movie;
        const values = await getRottenTomatoesScores(title, year);
        if (!values) {
            throw new Error(`Rotten Tomatoes rating for ${name} not found`);
        }
        const { criticsRatings, audienceRatings } = values;

        const criticsRating = await this.addOrCreateRating({
            movieId,
            value: criticsRatings,
            rating_source: RATING_SOURCERS.ROTTEN_TOMATOES,
            rating_unit: RATING_UNITS.PERCENTAGE,
        });

        const audienceRating = await this.addOrCreateRating({
            movieId,
            value: audienceRatings,
            rating_source: RATING_SOURCERS.ROTTEN_TOMATOES_AUDIENCE,
            rating_unit: RATING_UNITS.PERCENTAGE,
        });

        return {
            criticsRating,
            audienceRating,
        };
    }
}

export default RatingService;
