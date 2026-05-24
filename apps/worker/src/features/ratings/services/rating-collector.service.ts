import { RATING_SOURCES } from "../../../config/ratings";
import { MovieType } from "../../movies/types/db";
import { RatingCollectorServiceI } from "../interfaces/services";
import { AllocineProvider } from "../providers/allocine";
import { IMDBProvider } from "../providers/imdb";
import { LetterboxdProvider } from "../providers/letterboxd";
import { RottenProvider } from "../providers/rotten";
import { AllocineRatingType } from "../providers/types";
import { RatingCollectorResult } from "../types/rating";

export class RatingCollectorService implements RatingCollectorServiceI {
    constructor() {}

    async collectAllocine(movie: MovieType): Promise<RatingCollectorResult[]> {
        const { title, id: movieId, year, language, original_title } = movie;
        const provider = new AllocineProvider();

        let values: Awaited<AllocineRatingType>;
        if (language === "fr") {
            values = await provider.getRatings(original_title, year);
            if (!values)
                throw new Error(
                    `Allociné ratings for ${original_title} not found`,
                );
        } else {
            values = await provider.getRatings(title, year);
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
        const { title, id: movieId, imdb_id } = movie;
        const provider = new IMDBProvider();
        const value = await provider.getRatingsById(imdb_id);
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
        const provider = new RottenProvider();
        const values = await provider.getRatings(title, year);
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
        const provider = new LetterboxdProvider();
        const value = await provider.getRatings(title, year);
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
