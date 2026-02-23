import type { MovieModel } from "../../../movies/models/movie";
import type { MovieRatingModel } from "../../../movies/models/movie-rating";
import { mapMovieApiToModel } from "../../../movies/types/movie.api";
import type { RatingsSummaryModel } from "../../../movies/models/ratings-summary";
import type { FullMovieApiResponse } from "../../types/api";

export interface FullMovieModel {
    data: MovieModel;
    ratings: MovieRatingModel[];
    summary: RatingsSummaryModel | null;
}

export function mapApiResponseToModel(data: FullMovieApiResponse) {
    const { data: movie, ...rest } = data;
    return { ...rest, data: mapMovieApiToModel(movie) } as FullMovieModel;
}
