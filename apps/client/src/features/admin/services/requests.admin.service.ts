import { API_ENDPOINT } from "../../../core/config/api";
import { authHeaders } from "../../../shared/api/headers";
import type { ApiMovieRequestType } from "../../requests/types/api-request";

class ApiAdminRequestsService {
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

    async delete(id: string) {
        const url = new URL(`/requests/${id}`, API_ENDPOINT);
        const res = await fetch(url, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", ...authHeaders() },
        });
        if (!res.ok) {
            const error = await res
                .json()
                .catch(() => ({ message: res.statusText }));
            throw new Error(
                error.message ?? `Error deleting request: ${res.statusText}`,
            );
        }
        return true;
    }
}

export default new ApiAdminRequestsService();
