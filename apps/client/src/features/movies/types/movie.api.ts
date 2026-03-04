import type { MovieModel, MovieWithSummaryModel } from "../models/movie";

type ApiGenreType = {
    id: string;
    tmdb_id: number;
    name: string;
};

export type ApiMovieType = {
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
    slug: string;
    Genre: Array<ApiGenreType>;
};

export function mapMovieApiToModel(data: ApiMovieType) {
    const {
        tag_line: tagLine,
        imdb_id: imdbId,
        tmdb_id: tmdbId,
        Genre,
        ...rest
    } = data;
    return { ...rest, tagLine, imdbId, tmdbId, genres: Genre } as MovieModel;
}

export type ApiMovieTopType = {
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
    slug: string;
    Genre: Array<ApiGenreType>;
    Movie_Ratings_Summary: {
        score_value: number;
    } | null;
};

export function mapMovieTopApiToModel(
    data: ApiMovieTopType,
): MovieWithSummaryModel {
    const {
        tag_line: tagLine,
        imdb_id: imdbId,
        tmdb_id: tmdbId,
        Genre,
        Movie_Ratings_Summary,
        ...rest
    } = data;
    const ratings_summary = {
        score: Movie_Ratings_Summary?.score_value,
    };
    return {
        ...rest,
        tagLine,
        imdbId,
        tmdbId,
        genres: Genre,
        ratings_summary,
    } as MovieWithSummaryModel;
}
