import { RatingType } from "../types/db";
import { RatingAttributesType } from "../types/rating";

export interface RatingRepositoryI {
    addOrUpdate(data: RatingAttributesType): Promise<RatingType>;
    getRatingsByMovieId(movieId: string): Promise<Array<RatingType>>;
}
