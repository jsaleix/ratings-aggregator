import { RatingSource, RatingType } from "../types/db";
import { CreateRatingAttributesType } from "../types/rating";

export interface RatingRepositoryI {
    addOrUpdate(data: CreateRatingAttributesType): Promise<RatingType>;
    getRatingsByMovieId(movieId: string): Promise<Array<RatingType>>;
}

export interface RatingSourceRepositoryI {
    findAll(): Promise<RatingSource[]>;
}
