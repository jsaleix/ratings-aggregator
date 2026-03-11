import { API_ENDPOINT } from "../../../core/config/api";
import { authHeaders } from "../../../shared/api/headers";
import type { MovieRatingModel } from "../models/movie-rating";
import {
    mapRatingApiToModel,
    type ApiMovieRatingType,
} from "../types/movie-rating.api";

class ApiRatingsService {
    async getMovieRatings(slug: string): Promise<MovieRatingModel[]> {
        const url = new URL(`/ratings/movie/${slug}`, API_ENDPOINT);
        const res = await fetch(url, {
            method: "GET",
            headers: { ...authHeaders() },
        });
        if (!res.ok) {
            const error = await res
                .json()
                .catch(() => ({ message: res.statusText }));
            throw new Error(
                error.message ?? `Error fetching ratings: ${res.statusText}`,
            );
        }
        const response = (await res.json()) as ApiMovieRatingType[];
        return response.map(mapRatingApiToModel);
    }
}

export default new ApiRatingsService();
