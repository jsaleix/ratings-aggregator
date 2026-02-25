import { FullRatingType, RatingSource, RatingType } from "../types/db";
import { CreateRatingAttributesType } from "../types/rating";
import { RatingCollectorResult } from "./services";

export interface RatingRepositoryI {
    addOrUpdate(data: CreateRatingAttributesType): Promise<RatingType>;
    getRatingsByMovieId(movieId: string): Promise<Array<RatingType>>;
    setAllForMovie(
        movieId: string,
        collectedRatings: RatingCollectorResult[],
    ): Promise<FullRatingType[]>;
}

export interface RatingSourceRepositoryI {
    findAll(): Promise<RatingSource[]>;
}
