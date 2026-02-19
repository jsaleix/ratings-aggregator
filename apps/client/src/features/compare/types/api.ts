import type { MovieRatingModel } from "../../movies/types/movie-rating";
import type { MovieApiResponseType } from "../../movies/types/movie.api";
import type { RatingsSummaryApiResponseType } from "../../movies/types/ratings-summary.api";

export type CompareMoviesApiResponse = {
    movies: [
        {
            data: MovieApiResponseType;
            ratings: {
                common: MovieRatingModel[];
                unique: MovieRatingModel[];
            };
            summary: RatingsSummaryApiResponseType | null;
        },
        {
            data: MovieApiResponseType;
            ratings: {
                common: MovieRatingModel[];
                unique: MovieRatingModel[];
            };
            summary: RatingsSummaryApiResponseType | null;
        },
    ];
    meta: {
        common: string[];
    };
};

export type FullMovieApiResponse = {
    data: MovieApiResponseType;
    ratings: MovieRatingModel[];
    summary: RatingsSummaryApiResponseType | null;
};
