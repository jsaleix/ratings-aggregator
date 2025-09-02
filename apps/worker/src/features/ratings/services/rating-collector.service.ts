import { RATING_SOURCERS, RATING_UNITS } from "../../../config/ratings";
import { MovieType } from "../../movies/types/db";
import { getAllocineScore } from "../providers/allocine";
import { getIMDBScore } from "../providers/imdb";
import { getRottenTomatoesScores } from "../providers/rotten";
import RatingService from "./rating.service";

export class RatingCollectorService {
    constructor(private ratingService: RatingService) {}

    async collectAllocine(movie: MovieType) {
        const { title, id: movieId, year, language, original_title } = movie;

        let values: Awaited<ReturnType<typeof getAllocineScore>>;
        if (language === "fr") {
            values = await getAllocineScore(original_title, year);
            if (!values)
                throw new Error(`Allociné ratings for ${original_title} not found`);
        } else {
            values = await getAllocineScore(title, year);
            if (!values)
                throw new Error(`Allociné ratings for ${title} not found`);
        }

        const { press, audience } = values;

        return Promise.all([
            this.ratingService.addOrUpdate({
                movieId,
                value: press,
                rating_source: RATING_SOURCERS.ALLOCINE_PRESS,
                rating_unit: RATING_UNITS.STARS,
            }),
            this.ratingService.addOrUpdate({
                movieId,
                value: audience,
                rating_source: RATING_SOURCERS.ALLOCINE_AUDIENCE,
                rating_unit: RATING_UNITS.STARS,
            }),
        ]);
    }

    async collectIMDB(movie: MovieType) {
        const { title, id: movieId, year, imdbId } = movie;
        const value = await getIMDBScore(title, year, imdbId);
        if (!value) throw new Error(`IMDB rating for ${title} not found`);

        const { score, url } = value;

        return this.ratingService.addOrUpdate({
            movieId,
            value: score,
            rating_source: RATING_SOURCERS.IMDB,
            rating_unit: RATING_UNITS.POINTS,
            sourceUrl: url,
        });
    }

    async collectRotten(movie: MovieType) {
        const { title, id: movieId, year } = movie;
        const values = await getRottenTomatoesScores(title, year);
        if (!values)
            throw new Error(`Rotten Tomatoes rating for ${title} not found`);

        const { criticsRatings, audienceRatings, url } = values;

        return Promise.all([
            this.ratingService.addOrUpdate({
                movieId,
                value: criticsRatings,
                rating_source: RATING_SOURCERS.ROTTEN_TOMATOES,
                rating_unit: RATING_UNITS.PERCENTAGE,
                sourceUrl: url,
            }),
            this.ratingService.addOrUpdate({
                movieId,
                value: audienceRatings,
                rating_source: RATING_SOURCERS.ROTTEN_TOMATOES_AUDIENCE,
                rating_unit: RATING_UNITS.PERCENTAGE,
                sourceUrl: url,
            }),
        ]);
    }
}
