import { API_ENDPOINT } from "../../../core/config/api";
import { authHeaders } from "../../../shared/api/headers";
import type { RatingsSummaryModel } from "../types/ratings-summary";

class ApiSummaryService {
    async getMovieRatingSummary(id: string) {
        const url = new URL(`/summary/movie/${id}`, API_ENDPOINT);
        const res = await fetch(url, {
            method: "GET",
            headers: { ...authHeaders() },
        });
        if (!res.ok) {
            throw new Error(
                `Error fetching ratings summary for movie with id ${id}: ${res.statusText}`
            );
        }
        return (await res.json()) as RatingsSummaryModel;
    }
}

export default new ApiSummaryService();
