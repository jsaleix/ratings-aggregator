import { API_ENDPOINT } from "../../../core/config/api";
import { authHeaders } from "../../../shared/api/headers";
import type { PaginatedResult } from "../../../shared/types/pagination";
import type { UserType } from "../../auth/types/user";

type GetAllUsersParams = {
    order?: "asc" | "desc";
    orderBy?: string;
    page?: number;
};

class ApiUsersService {
    async getAll({ page, order, orderBy }: GetAllUsersParams) {
        const url = new URL("/users", API_ENDPOINT);
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
        return (await res.json()) as PaginatedResult<UserType>;
    }
}

export default new ApiUsersService();
