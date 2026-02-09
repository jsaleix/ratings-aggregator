import { RatingType } from "../../ratings/types/db";
import { MovieRatingSummaryType } from "../types/db";

export interface SummaryRepositoryI {
    saveSummary({
        movieId,
        content,
        score,
    }: {
        movieId: string;
        content: string;
        score: string;
    }): Promise<MovieRatingSummaryType>;

    getRatingsByMovieId(movieId: string): Promise<RatingType[]>;
}
