import { API_ENDPOINT } from "../../../core/config/api";
import type { GetOneFullResponse } from "../types/users.api";
import { authHeaders } from "../../../shared/api/headers";
import type { PaginatedResult } from "../../../shared/types/pagination";

type GetAllUsersParams = {
    order?: "asc" | "desc";
    orderBy?: string;
    page?: number;
};

class ApiUsersService {
    async getAll({ page, order, orderBy }: GetAllUsersParams) {
        const url = new URL("/users/admin", API_ENDPOINT);
        if (page) url.searchParams.append("page", page.toString());
        if (orderBy) url.searchParams.append("orderBy", orderBy);
        if (order) url.searchParams.append("order", order);

        const res = await fetch(url, {
            method: "GET",
            headers: {
                ...authHeaders(),
            },
        });
        if (!res.ok) {
            throw new Error(`Error fetching users: ${res.statusText}`);
        }
        return (await res.json()) as PaginatedResult<GetOneFullResponse>;
    }

    async getOneFull(id: string) {
        const url = new URL(`/users/admin/${id}`, API_ENDPOINT);
        const res = await fetch(url, {
            method: "GET",
            headers: {
                ...authHeaders(),
            },
        });
        if (!res.ok) {
            throw new Error(`Error fetching user: ${res.statusText}`);
        }
        return (await res.json()) as GetOneFullResponse;
    }
}

export default new ApiUsersService();
