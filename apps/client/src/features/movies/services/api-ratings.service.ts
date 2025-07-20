import { API_ENDPOINT } from "../../../core/config/api";
import type { MovieRatingModel } from "../types/movie-rating";

class ApiRatingsService {
    async getMovieRatings(id: string) {
        const url = new URL(`/ratings/movie/${id}`, API_ENDPOINT);
        const res = await fetch(url, {
            method: "GET",
        });
        if (!res.ok) {
            throw new Error(
                `Error fetching ratings for movie with id ${id}: ${res.statusText}`
            );
        }
        return (await res.json()) as MovieRatingModel[];
    }
}

export default new ApiRatingsService();
