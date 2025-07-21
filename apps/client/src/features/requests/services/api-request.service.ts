import { API_ENDPOINT } from "../../../core/config/api";
import { authHeaders } from "../../../shared/api/headers";
import type {
    CreateRequestType,
    MovieRequestModel,
} from "../types/movie-request";

class ApiRequestService {
    async getAll() {
        const url = new URL(`/requests`, API_ENDPOINT);
        const res = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json", ...authHeaders() },
        });
        if (!res.ok) {
            throw new Error(`Error fetching requests: ${res.statusText}`);
        }
        return (await res.json()) as MovieRequestModel[];
    }

    async create(data: CreateRequestType) {
        const url = new URL(`/requests`, API_ENDPOINT);
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json", ...authHeaders() },

            body: JSON.stringify(data),
        });
        if (!res.ok) {
            throw new Error(`Error creating request: ${res.statusText}`);
        }
        return (await res.json()) as MovieRequestModel;
    }
}

export default new ApiRequestService();
