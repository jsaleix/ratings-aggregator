import { RATING_SOURCES, RATING_UNITS } from "../../../config/ratings";
import { MovieType } from "../../movies/types/db";
import {
    RatingRepositoryI,
    RatingSourceRepositoryI,
} from "../interfaces/repositories";
import { getAllocineScore } from "../providers/allocine";
import { getIMDBScore } from "../providers/imdb";
import { getLetterBoxdScore } from "../providers/letterboxd";
import { getRottenTomatoesScores } from "../providers/rotten";

export class RatingCollectorService {
    private ratingSourceCache: Map<string, string> | null = null;
    private ratingSourceCacheExpiry: number | null = null;
    private readonly CACHE_TTL_MS = 60 * 60 * 1000; // 1h

    constructor(
        private ratingRepository: RatingRepositoryI,
        private ratingSourceRepository: RatingSourceRepositoryI,
    ) {}

    private async getRatingSourceId(code: string): Promise<string> {
        const now = Date.now();
        if (
            !this.ratingSourceCache ||
            !this.ratingSourceCacheExpiry ||
            now > this.ratingSourceCacheExpiry
        ) {
            const sources = await this.ratingSourceRepository.findAll();
            this.ratingSourceCache = new Map(
                sources.map((s) => [s.code, s.id]),
            );
            this.ratingSourceCacheExpiry = now + this.CACHE_TTL_MS;
        }
        console.log(this.ratingSourceCache);
        const id = this.ratingSourceCache.get(code);
        if (!id) throw new Error(`Rating source "${code}" not found`);
        return id;
    }

    async collectAllocine(movie: MovieType) {
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

        return Promise.all([
            this.ratingRepository.addOrUpdate({
                movieId,
                value: press,
                rating_source_id: await this.getRatingSourceId(
                    RATING_SOURCES.ALLOCINE_PRESS,
                ),
            }),
            this.ratingRepository.addOrUpdate({
                movieId,
                value: audience,
                rating_source_id: await this.getRatingSourceId(
                    RATING_SOURCES.ALLOCINE_AUDIENCE,
                ),
            }),
        ]);
    }

    async collectIMDB(movie: MovieType) {
        const { title, id: movieId, year, imdb_id } = movie;
        const value = await getIMDBScore(title, year, imdb_id);
        if (!value) throw new Error(`IMDB rating for ${title} not found`);

        const { score, url } = value;

        return this.ratingRepository.addOrUpdate({
            movieId,
            value: score,
            source_url: url,
            rating_source_id: await this.getRatingSourceId(RATING_SOURCES.IMDB),
        });
    }

    async collectRotten(movie: MovieType) {
        const { title, id: movieId, year } = movie;
        const values = await getRottenTomatoesScores(title, year);
        if (!values)
            throw new Error(`Rotten Tomatoes rating for ${title} not found`);

        const { criticsRatings, audienceRatings, url } = values;

        return Promise.all([
            this.ratingRepository.addOrUpdate({
                movieId,
                value: criticsRatings,
                source_url: url,
                rating_source_id: await this.getRatingSourceId(
                    RATING_SOURCES.ROTTEN_TOMATOES,
                ),
            }),
            this.ratingRepository.addOrUpdate({
                movieId,
                value: audienceRatings,
                source_url: url,
                rating_source_id: await this.getRatingSourceId(
                    RATING_SOURCES.ROTTEN_TOMATOES_AUDIENCE,
                ),
            }),
        ]);
    }

    async collectLetterboxd(movie: MovieType) {
        const { title, id: movieId, year } = movie;
        const value = await getLetterBoxdScore(title, year);
        if (!value) throw new Error(`Letterboxd score for ${title} not found`);
        if (value.score === "N/A")
            throw new Error(`Letterboxd score not available for ${title}`);

        const { score, url } = value;

        return this.ratingRepository.addOrUpdate({
            movieId,
            value: score,
            source_url: url,
            rating_source_id: await this.getRatingSourceId(
                RATING_SOURCES.LETTERBOXD,
            ),
        });
    }
}
