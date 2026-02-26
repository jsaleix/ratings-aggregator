import { MovieRatingType } from "../../ratings/types/db";
import { MovieRatingsSummaryType } from "../types/db";

export interface SummaryRepositoryI {
    saveSummary({
        movieId,
        content,
        scoreValue,
    }: {
        movieId: string;
        content: string;
        scoreValue: number;
    }): Promise<MovieRatingsSummaryType>;

    getRatingsByMovieId(movieId: string): Promise<MovieRatingType[]>;
}
