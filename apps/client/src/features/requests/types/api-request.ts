import type { MovieRequestModel } from "../models/movie-request";

export type ApiMovieRequestType = {
    id: string;
    tmdbId: number;
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
    tmdbId: request.tmdbId,
    title: request.title,
    created_at: request.created_at,
});
