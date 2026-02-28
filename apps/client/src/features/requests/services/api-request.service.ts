import { API_ENDPOINT } from "../../../core/config/api";
import { authHeaders } from "../../../shared/api/headers";
import type {
    ApiGetCountResponse,
    ApiMovieRequestType,
} from "../types/api-request";
import type { CreateRequestType } from "../types/schemas";

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
        return (await res.json()) as ApiMovieRequestType[];
    }

    async create(data: CreateRequestType) {
        const url = new URL(`/requests`, API_ENDPOINT);
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json", ...authHeaders() },

            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const error = await res
                .json()
                .catch(() => ({ message: res.statusText }));
            throw new Error(
                error.message ?? `Error creating request: ${res.statusText}`,
            );
        }
        return (await res.json()) as ApiMovieRequestType;
    }

    async getCount() {
        const url = new URL(`/requests/count`, API_ENDPOINT);
        const res = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
            const error = await res
                .json()
                .catch(() => ({ message: res.statusText }));
            throw new Error(
                error.message ?? `Error fetching request: ${res.statusText}`,
            );
        }
        return (await res.json()) as ApiGetCountResponse;
    }
}

export default new ApiRequestService();
