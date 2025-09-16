import type { MovieModel } from "../../../movies/types/movie";
import type { MovieRatingModel } from "../../../movies/types/movie-rating";
import type { RatingsSummaryModel } from "../../../movies/types/ratings-summary";
import type { CompareMoviesApiResponse } from "../../types/api";

export interface MoviesComparaisonModel {
    movies: [
        {
            data: MovieModel;
            ratings: {
                common: MovieRatingModel[];
                unique: MovieRatingModel[];
            };
            summary: RatingsSummaryModel | null;
        },
        {
            data: MovieModel;
            ratings: {
                common: MovieRatingModel[];
                unique: MovieRatingModel[];
            };
            summary: RatingsSummaryModel | null;
        }
    ];
    meta: {
        common: string[];
    };
}

export function mapApiResponseToModel(data: CompareMoviesApiResponse) {
    return data as MoviesComparaisonModel;
}
