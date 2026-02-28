import { API_ENDPOINT } from "../../../core/config/api";
import type { ApiAdminUserType } from "../types/users.api";
import { authHeaders } from "../../../shared/api/headers";
import type { PaginatedResult } from "../../../shared/types/pagination";
import type { AdminUpdateProfileType } from "../../auth/types/admin";
import {
    mapAdminUserApiToModel,
    type UserAdminModel,
} from "../models/user.admin";

type GetAllUsersParams = {
    order?: "asc" | "desc";
    orderBy?: string;
    page?: number;
};

class ApiAdminUsersService {
    async getAll({
        page,
        order,
        orderBy,
    }: GetAllUsersParams): Promise<PaginatedResult<UserAdminModel>> {
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
            const error = await res
                .json()
                .catch(() => ({ message: res.statusText }));
            throw new Error(
                error.message ?? `Error fetching users: ${res.statusText}`,
            );
        }
        const { data, pagination } =
            (await res.json()) as PaginatedResult<ApiAdminUserType>;
        return { pagination, data: data.map((d) => mapAdminUserApiToModel(d)) };
    }

    async getOneFull(id: string): Promise<UserAdminModel> {
        const url = new URL(`/users/admin/${id}`, API_ENDPOINT);
        const res = await fetch(url, {
            method: "GET",
            headers: {
                ...authHeaders(),
            },
        });
        if (!res.ok) {
            const error = await res
                .json()
                .catch(() => ({ message: res.statusText }));
            throw new Error(
                error.message ?? `Error fetching users: ${res.statusText}`,
            );
        }
        const data = (await res.json()) as ApiAdminUserType;
        return mapAdminUserApiToModel(data);
    }

    async updateOneFull(
        id: string,
        payload: AdminUpdateProfileType,
    ): Promise<UserAdminModel> {
        const url = new URL(`/users/admin/${id}`, API_ENDPOINT);
        const res = await fetch(url, {
            method: "PATCH",
            headers: {
                ...authHeaders(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        if (!res.ok) {
            const error = await res
                .json()
                .catch(() => ({ message: res.statusText }));
            throw new Error(
                error.message ?? `Error fetching users: ${res.statusText}`,
            );
        }
        const data = (await res.json()) as ApiAdminUserType;
        return mapAdminUserApiToModel(data);
    }
}

export default new ApiAdminUsersService();
