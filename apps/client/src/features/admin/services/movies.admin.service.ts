import { API_ENDPOINT } from "../../../core/config/api";
import type { PaginatedResult } from "../../../shared/types/pagination";
import type { MovieModel } from "../../movies/models/movie";
import {
    mapMovieApiToModel,
    type ApiMovieType,
} from "../../movies/types/movie.api";

export type AdminFindAllMoviesParams = {
    order?: "asc" | "desc";
    orderBy?: string;
    page?: number;
    title?: string;
    year?: number;
};

class ApiAdminMoviesService {
    async findAll({
        page,
        order,
        orderBy,
        title,
        year,
    }: AdminFindAllMoviesParams): Promise<PaginatedResult<MovieModel>> {
        const url = new URL("/movies/admin/all", API_ENDPOINT);
        if (page) url.searchParams.append("page", page.toString());
        if (orderBy) url.searchParams.append("orderBy", orderBy);
        if (order) url.searchParams.append("order", order);
        if (title) url.searchParams.append("title", title);
        if (year) url.searchParams.append("year", year.toString());

        const res = await fetch(url, {
            method: "GET",
        });
        if (!res.ok) {
            const error = await res
                .json()
                .catch(() => ({ message: res.statusText }));
            throw new Error(
                error.message ?? `Error fetching movies: ${res.statusText}`,
            );
        }
        const rawResponse = (await res.json()) as PaginatedResult<ApiMovieType>;
        const { data, pagination } = rawResponse;
        return {
            pagination,
            data: data.map(mapMovieApiToModel),
        } satisfies PaginatedResult<MovieModel>;
    }

    async getById(id: string) {
        const url = new URL(`/movies/admin/${id}`, API_ENDPOINT);
        const res = await fetch(url, {
            method: "GET",
        });
        if (!res.ok) {
            const error = await res
                .json()
                .catch(() => ({ message: res.statusText }));
            throw new Error(
                error.message ?? `Error fetching movie: ${res.statusText}`,
            );
        }
        const data = (await res.json())["movie"] as ApiMovieType;
        return mapMovieApiToModel(data) satisfies MovieModel;
    }

    async delete(id: string) {
        const url = new URL(`/movies/admin/${id}`, API_ENDPOINT);
        const res = await fetch(url, {
            method: "DELETE",
        });
        if (!res.ok) {
            const error = await res
                .json()
                .catch(() => ({ message: res.statusText }));
            throw new Error(
                error.message ?? `Error deleting movie: ${res.statusText}`,
            );
        }
        return true;
    }
}

export default new ApiAdminMoviesService();
