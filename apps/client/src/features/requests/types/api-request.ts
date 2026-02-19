import type { MovieRequestModel } from "../models/movie-request";

export type ApiMovieRequestType = {
    id: string;
    tmdb_id: number;
    title: string;
    created_at: string;
};

export type ApiGetCountResponse = {
    current: number;
    max: number;
    left: number;
};

export const mapApiRequestToMovieRequestModel = (
    request: ApiMovieRequestType
): MovieRequestModel => ({
    id: request.id,
    tmdb_id: request.tmdb_id,
    title: request.title,
    created_at: request.created_at,
});
