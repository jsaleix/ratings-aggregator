import { API_ENDPOINT } from "../../../core/config/api";
import { authHeaders } from "../../../shared/api/headers";
import type { RatingsSummaryModel } from "../../movies/models/ratings-summary";
import {
    type ApiRatingsSummaryType,
    mapRatingsSummaryApiToModel,
} from "../../movies/types/ratings-summary.api";

class ApiAdminSummaryService {
    async getMovieRatingSummary(slug: string): Promise<RatingsSummaryModel> {
        const url = new URL(`/summary/movie/${slug}`, API_ENDPOINT);
        const res = await fetch(url, {
            method: "GET",
            headers: { ...authHeaders() },
        });
        if (!res.ok) {
            const error = await res
                .json()
                .catch(() => ({ message: res.statusText }));
            throw new Error(
                error.message ??
                    `Error fetching movie summary: ${res.statusText}`,
            );
        }
        const response = (await res.json()) as ApiRatingsSummaryType;
        return mapRatingsSummaryApiToModel(response);
    }

    async refresh(movieId: string) {
        const url = new URL(`/summary/movie/admin/${movieId}/refresh`, API_ENDPOINT);
        const res = await fetch(url, {
            method: "POST",
            headers: { ...authHeaders() },
        });
        if (!res.ok) {
            throw new Error(
                `Error refreshing summary for movie with id ${movieId}: ${res.statusText}`,
            );
        }
        return true;
    }

    async delete(id: string) {
        const url = new URL(`/summary/admin/${id}`, API_ENDPOINT);
        const res = await fetch(url, {
            method: "DELETE",
        });
        if (!res.ok) {
            throw new Error(
                `Error deleting summary with id ${id}: ${res.statusText}`,
            );
        }
        return true;
    }
}

export default new ApiAdminSummaryService();
