import { API_ENDPOINT } from "../../../core/config/api";
import { authHeaders } from "../../../shared/api/headers";
import type { PaginatedResult } from "../../../shared/types/pagination";
import type { RequestAdminModel } from "../models/request.admin";
import {
    mapApiAdminRequestToModel,
    type ApiAdminRequestType,
} from "../types/requests.api";

type ApiGetAllRequestsParams = { page?: number; processed?: boolean };
class ApiAdminRequestsService {
    async getAll({
        page,
        processed,
    }: ApiGetAllRequestsParams): Promise<PaginatedResult<RequestAdminModel>> {
        const url = new URL(`/requests/admin`, API_ENDPOINT);
        if (page) url.searchParams.append("page", page.toString());
        if (processed !== undefined)
            url.searchParams.append("processed", processed.toString());

        const res = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json", ...authHeaders() },
        });
        if (!res.ok) {
            const error = await res
                .json()
                .catch(() => ({ message: res.statusText }));
            throw new Error(
                error.message ?? `Error fetching requests: ${res.statusText}`,
            );
        }
        const { data, pagination } =
            (await res.json()) as PaginatedResult<ApiAdminRequestType>;
        return {
            pagination,
            data: data.map((d) => mapApiAdminRequestToModel(d)),
        };
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
