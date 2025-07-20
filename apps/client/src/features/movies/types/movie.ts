import type { MovieRatingsStatusType } from "../../constants";

export interface MovieModel {
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
    ratings_status: MovieRatingsStatusType;
}
