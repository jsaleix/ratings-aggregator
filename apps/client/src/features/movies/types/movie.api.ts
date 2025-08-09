import type { MovieModel } from "./movie";

export type MovieApiResponseType = {
    id: string;
    title: string;
    created_at: string;
    tmdbId: number;
    tagLine: string;
    summary: string;
    runtime: number;
    release_date: string;
    year: number;
    budget: number;
    poster_path: string;
};

export type GetAllMoviesResponse = MovieApiResponseType[];

export function mapMovieApiToModel(data: MovieApiResponseType) {
    return data as MovieModel;
}
