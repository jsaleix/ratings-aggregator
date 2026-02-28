import { API_ENDPOINT } from "../../../core/config/api";
import { authHeaders } from "../../../shared/api/headers";
import type { RequestAdminModel } from "../models/request.admin";
import {
    mapApiAdminRequestToModel,
    type ApiRequestType,
} from "../types/requests.api";

class ApiAdminRequestsService {
    async getAll(): Promise<RequestAdminModel[]> {
        const url = new URL(`/requests`, API_ENDPOINT);
        const res = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json", ...authHeaders() },
        });
        if (!res.ok) {
            const error = await res
                .json()
                .catch(() => ({ message: res.statusText }));
            throw new Error(
                error.message ?? `Error fetching users: ${res.statusText}`,
            );
        }
        const data = (await res.json()) as ApiRequestType[];
        return data.map(mapApiAdminRequestToModel);
    }

    async delete(id: string) {
        const url = new URL(`/requests/admin/${id}`, API_ENDPOINT);
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

    async addMultipleRequests(tmdbIds: number[]): Promise<boolean> {
        const url = new URL(`/requests/admin/multiple`, API_ENDPOINT);
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ tmdbIds }),
        });
        if (!res.ok) {
            const error = await res
                .json()
                .catch(() => ({ message: res.statusText }));
            throw new Error(
                error.message ?? `Error adding requests: ${res.statusText}`,
            );
        }
        return true;
    }
}

export default new ApiAdminRequestsService();
