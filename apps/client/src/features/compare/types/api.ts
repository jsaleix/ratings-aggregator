import type { MovieRatingApiResponseType } from "../../movies/types/movie-rating.api";
import type { MovieApiResponseType } from "../../movies/types/movie.api";
import type { RatingsSummaryApiResponseType } from "../../movies/types/ratings-summary.api";

export type CompareMoviesApiResponse = {
    movies: [
        {
            data: MovieApiResponseType;
            ratings: {
                common: MovieRatingApiResponseType[];
                unique: MovieRatingApiResponseType[];
            };
            summary: RatingsSummaryApiResponseType | null;
        },
        {
            data: MovieApiResponseType;
            ratings: {
                common: MovieRatingApiResponseType[];
                unique: MovieRatingApiResponseType[];
            };
            summary: RatingsSummaryApiResponseType | null;
        }
    ];
    meta: {
        common: string[];
    };
};
