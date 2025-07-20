import { API_ENDPOINT } from "../../../core/config/api";
import type { MovieRequestModel } from "../types/movie-request";

class ApiRequestService {
    async getAll() {
        const url = new URL(`/requests`, API_ENDPOINT);
        const res = await fetch(url, {
            method: "GET",
        });
        if (!res.ok) {
            throw new Error(`Error fetching requests: ${res.statusText}`);
        }
        return (await res.json()) as MovieRequestModel[];
    }
}

export default new ApiRequestService();
