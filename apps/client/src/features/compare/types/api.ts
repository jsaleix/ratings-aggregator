import type { MovieRatingModel } from "../../movies/models/movie-rating";
import type { ApiMovieType } from "../../movies/types/movie.api";
import type { ApiRatingsSummaryType } from "../../movies/types/ratings-summary.api";

export type CompareMoviesApiResponse = {
    movies: [
        {
            data: ApiMovieType;
            ratings: {
                common: MovieRatingModel[];
                unique: MovieRatingModel[];
            };
            summary: ApiRatingsSummaryType | null;
        },
        {
            data: ApiMovieType;
            ratings: {
                common: MovieRatingModel[];
                unique: MovieRatingModel[];
            };
            summary: ApiRatingsSummaryType | null;
        },
    ];
    meta: {
        common: string[];
    };
};

export type FullMovieApiResponse = {
    data: ApiMovieType;
    ratings: MovieRatingModel[];
    summary: ApiRatingsSummaryType | null;
};
