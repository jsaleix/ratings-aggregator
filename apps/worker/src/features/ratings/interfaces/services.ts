import { MovieType } from "../../movies/types/db";
import { RatingCollectorResult } from "../types/rating";

export interface RatingCollectorServiceI {
    collectAllocine(movie: MovieType): Promise<RatingCollectorResult[]>;
    collectIMDB(movie: MovieType): Promise<RatingCollectorResult>;
    collectRotten(movie: MovieType): Promise<RatingCollectorResult[]>;
    collectLetterboxd(movie: MovieType): Promise<RatingCollectorResult>;
}

export interface RatingSourceServiceI {
    getRatingSourceId(code: string): Promise<string>;
}
