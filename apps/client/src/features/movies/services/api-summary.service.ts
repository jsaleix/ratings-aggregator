import { API_ENDPOINT } from "../../../core/config/api";
import { authHeaders } from "../../../shared/api/headers";
import type { RatingsSummaryModel } from "../types/ratings-summary";

class ApiSummaryService {
    async getMovieRatingSummary(movieId: string) {
        const url = new URL(`/summary/movie/${movieId}`, API_ENDPOINT);
        const res = await fetch(url, {
            method: "GET",
            headers: { ...authHeaders() },
        });
        if (!res.ok) {
            throw new Error(
                `Error fetching ratings summary for movie with id ${movieId}: ${res.statusText}`
            );
        }
        return (await res.json()) as RatingsSummaryModel;
    }

    async refresh(movieId: string) {
        const url = new URL(`/summary/movie/${movieId}/refresh`, API_ENDPOINT);
        const res = await fetch(url, {
            method: "POST",
            headers: { ...authHeaders() },
        });
        if (!res.ok) {
            throw new Error(
                `Error refreshing summary for movie with id ${movieId}: ${res.statusText}`
            );
        }
        return true;
    }

    async delete(id: string) {
        const url = new URL(`/summary/${id}`, API_ENDPOINT);
        const res = await fetch(url, {
            method: "DELETE",
        });
        if (!res.ok) {
            throw new Error(
                `Error deleting summary with id ${id}: ${res.statusText}`
            );
        }
        return true;
    }
}

export default new ApiSummaryService();
