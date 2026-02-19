import { FullRatingType, RatingType } from "../../ratings/types/db";
import { MovieRatingSummaryType } from "../types/db";

export interface SummaryRepositoryI {
    saveSummary({
        movieId,
        content,
        scoreValue,
    }: {
        movieId: string;
        content: string;
        scoreValue: number;
    }): Promise<MovieRatingSummaryType>;

    getRatingsByMovieId(movieId: string): Promise<FullRatingType[]>;
}
