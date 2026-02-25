import { RATING_SOURCES } from "../../../config/ratings";
import { MovieType } from "../../movies/types/db";
import {
    RatingCollectorResult,
    RatingCollectorServiceI,
} from "../interfaces/services";
import { getAllocineScore } from "../providers/allocine";
import { getIMDBScore } from "../providers/imdb";
import { getLetterBoxdScore } from "../providers/letterboxd";
import { getRottenTomatoesScores } from "../providers/rotten";

export class RatingCollectorService implements RatingCollectorServiceI {
    constructor() {}

    async collectAllocine(movie: MovieType): Promise<RatingCollectorResult[]> {
        const { title, id: movieId, year, language, original_title } = movie;

        let values: Awaited<ReturnType<typeof getAllocineScore>>;
        if (language === "fr") {
            values = await getAllocineScore(original_title, year);
            if (!values)
                throw new Error(
                    `Allociné ratings for ${original_title} not found`,
                );
        } else {
            values = await getAllocineScore(title, year);
            if (!values)
                throw new Error(`Allociné ratings for ${title} not found`);
        }

        const { press, audience } = values;

        return [
            {
                movieId,
                value: press,
                rating_source_code: RATING_SOURCES.ALLOCINE_PRESS,
            },
            {
                movieId,
                value: audience,
                rating_source_code: RATING_SOURCES.ALLOCINE_AUDIENCE,
            },
        ];
    }

    async collectIMDB(movie: MovieType): Promise<RatingCollectorResult> {
        const { title, id: movieId, year, imdb_id } = movie;
        const value = await getIMDBScore(title, year, imdb_id);
        if (!value) throw new Error(`IMDB rating for ${title} not found`);

        const { score, url } = value;

        return {
            movieId,
            value: score,
            source_url: url,
            rating_source_code: RATING_SOURCES.IMDB,
        };
    }

    async collectRotten(movie: MovieType): Promise<RatingCollectorResult[]> {
        const { title, id: movieId, year } = movie;
        const values = await getRottenTomatoesScores(title, year);
        if (!values)
            throw new Error(`Rotten Tomatoes rating for ${title} not found`);

        const { criticsRatings, audienceRatings, url } = values;

        return [
            {
                movieId,
                value: criticsRatings,
                source_url: url,
                rating_source_code: RATING_SOURCES.ROTTEN_TOMATOES,
            },
            {
                movieId,
                value: audienceRatings,
                source_url: url,
                rating_source_code: RATING_SOURCES.ROTTEN_TOMATOES_AUDIENCE,
            },
        ];
    }

    async collectLetterboxd(movie: MovieType): Promise<RatingCollectorResult> {
        const { title, id: movieId, year } = movie;
        const value = await getLetterBoxdScore(title, year);
        if (!value) throw new Error(`Letterboxd score for ${title} not found`);
        if (value.score === "N/A")
            throw new Error(`Letterboxd score not available for ${title}`);

        const { score, url } = value;

        return {
            movieId,
            value: score,
            source_url: url,
            rating_source_code: RATING_SOURCES.LETTERBOXD,
        };
    }
}
