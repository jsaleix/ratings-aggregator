import type { MovieModel } from "./movie";

export type MovieApiResponseType = {
    id: string;
    title: string;
    created_at: string;
    tag_line: string;
    summary: string;
    runtime: number;
    release_date: string;
    year: number;
    budget: number;
    poster_path: string;
    language: string;
    original_title: string;
    tmdb_id: number;
    imdb_id: string;
};

export type GetAllMoviesResponse = MovieApiResponseType[];

export function mapMovieApiToModel(data: MovieApiResponseType) {
    const {
        tag_line: tagLine,
        imdb_id: imdbId,
        tmdb_id: tmdbId,
        ...rest
    } = data;
    return { ...rest, tagLine, imdbId, tmdbId } as MovieModel;
}
