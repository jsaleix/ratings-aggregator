import { MovieType } from "../../movies/types/db";

export type CalcScoreRatingItem = {
    value: string;
    Rating_Source: {
        rating_unit: string;
    };
};

export type RatingCollectorResult = {
    movieId: string;
    value: string;
    rating_source_code: string;
    extra?: string;
    source_url?: string
};

export interface RatingCollectorServiceI {
    collectAllocine(movie: MovieType): Promise<RatingCollectorResult[]>;
    collectIMDB(movie: MovieType): Promise<RatingCollectorResult>;
    collectRotten(movie: MovieType): Promise<RatingCollectorResult[]>;
    collectLetterboxd(movie: MovieType): Promise<RatingCollectorResult>;
}

export interface ScoreServiceI {
    calcScore(ratings: CalcScoreRatingItem[]): number;
    getScore(rating: CalcScoreRatingItem): number | undefined;
}

export interface RatingSourceServiceI {
    getRatingSourceId(code: string): Promise<string>;
}
