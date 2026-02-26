import { MovieRatingType, RatingSourceType } from "../types/db";
import {
    CreateRatingAttributesType,
    RatingCollectorResult,
} from "../types/rating";

export interface RatingRepositoryI {
    addOrUpdate(data: CreateRatingAttributesType): Promise<MovieRatingType>;
    getRatingsByMovieId(movieId: string): Promise<Array<MovieRatingType>>;
    setAllForMovie(
        movieId: string,
        collectedRatings: RatingCollectorResult[],
    ): Promise<MovieRatingType[]>;
}

export interface RatingSourceRepositoryI {
    findAll(): Promise<RatingSourceType[]>;
}
