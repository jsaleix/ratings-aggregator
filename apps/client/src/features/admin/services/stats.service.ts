import { API_ENDPOINT } from "../../../core/config/api";
import { authHeaders } from "../../../shared/api/headers";
import type { GetAllStatsResponse } from "../types/stats.api";

class ApiStatsService {
    async getAll() {
        const url = new URL("/stats/full", API_ENDPOINT);

        const res = await fetch(url, {
            method: "GET",
            headers: {
                ...authHeaders(),
            },
        });
        if (!res.ok) {
            throw new Error(`Error fetching stats: ${res.statusText}`);
        }
        return (await res.json()) as GetAllStatsResponse;
    }
}

export default new ApiStatsService();
