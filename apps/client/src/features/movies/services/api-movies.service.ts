import { API_ENDPOINT } from "../../../core/config/api";
import type { PaginatedResult } from "../../../shared/types/pagination";
import type { TMDBGetMovieType } from "../../requests/types/tmdb";
import type { MovieModel, MovieWithSummaryModel } from "../models/movie";
import {
    mapMovieApiToModel,
    mapMovieTopApiToModel,
    type ApiMovieTopType,
    type ApiMovieType,
} from "../types/movie.api";

export type SearchMovieParams = {
    title: string;
    order?: "asc" | "desc";
    orderBy?: string;
    page?: number;
};

export type GetAllMoviesParams = {
    order?: "asc" | "desc";
    orderBy?: string;
    page?: number;
};

class ApiMoviesService {
    async getAll({
        page,
        order,
        orderBy,
    }: GetAllMoviesParams): Promise<PaginatedResult<MovieModel>> {
        const url = new URL("/movies", API_ENDPOINT);
        if (page) url.searchParams.append("page", page.toString());
        if (orderBy) url.searchParams.append("orderBy", orderBy);
        if (order) url.searchParams.append("order", order);

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

    async getRandom(): Promise<Array<MovieModel>> {
        const url = new URL("/movies/random", API_ENDPOINT);

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
        const data = (await res.json()) as Array<ApiMovieType>;
        return data.map(mapMovieApiToModel) satisfies MovieModel[];
    }

    async getTop(): Promise<Array<Required<MovieWithSummaryModel>>> {
        const url = new URL("/movies/top", API_ENDPOINT);

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
        const data = (await res.json()) as Array<ApiMovieTopType>;
        return data.map(
            mapMovieTopApiToModel,
        ) as Required<MovieWithSummaryModel>[];
    }

    async getRelated(slug: string): Promise<Array<MovieModel>> {
        const url = new URL(`/movies/slug/${slug}/related`, API_ENDPOINT);

        const res = await fetch(url, {
            method: "GET",
        });
        if (!res.ok) {
            const error = await res
                .json()
                .catch(() => ({ message: res.statusText }));
            throw new Error(
                error.message ??
                    `Error fetching related movies: ${res.statusText}`,
            );
        }
        const data = (await res.json()) as Array<ApiMovieType>;
        return data.map(mapMovieApiToModel) satisfies MovieModel[];
    }

    async getBySlug(slug: string) {
        const url = new URL(`/movies/slug/${slug}`, API_ENDPOINT);
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
        const data = (await res.json())["movie"] as ApiMovieType;
        return mapMovieApiToModel(data) satisfies MovieModel;
    }

    async search(
        params: SearchMovieParams,
    ): Promise<PaginatedResult<MovieModel>> {
        const { title, page, order, orderBy } = params;
        const url = new URL("/movies/search", API_ENDPOINT);

        url.searchParams.append("title", title);
        url.searchParams.append("page", page ? page.toString() : "1");
        if (order) url.searchParams.append("order", order);
        if (orderBy) url.searchParams.append("orderBy", orderBy);

        const res = await fetch(url, {
            method: "GET",
        });
        if (!res.ok) {
            const error = await res
                .json()
                .catch(() => ({ message: res.statusText }));
            throw new Error(
                error.message ?? `Error searching movies: ${res.statusText}`,
            );
        }
        const { data, pagination } =
            (await res.json()) as PaginatedResult<ApiMovieType>;
        return {
            data: data.map((d) => mapMovieApiToModel(d)),
            pagination,
        } as PaginatedResult<MovieModel>;
    }

    async searchByTMDBID(title: string): Promise<Array<TMDBGetMovieType>> {
        const url = new URL("/movies/search-with-tmdb", API_ENDPOINT);

        url.searchParams.append("title", title);

        const res = await fetch(url, {
            method: "GET",
        });
        if (!res.ok) {
            const error = await res
                .json()
                .catch(() => ({ message: res.statusText }));
            throw new Error(
                error.message ?? `Error searching movies: ${res.statusText}`,
            );
        }
        return (await res.json()) as Array<TMDBGetMovieType>;
    }

    async searchTMDB(query: string) {
        const url = new URL("/movies/search-tmdb", API_ENDPOINT);
        url.searchParams.append("query", query);
        const res = await fetch(url, {
            method: "GET",
        });
        if (!res.ok) {
            const error = await res
                .json()
                .catch(() => ({ message: res.statusText }));
            throw new Error(
                error.message ?? `Error searching movies: ${res.statusText}`,
            );
        }
        return (await res.json()) as Array<TMDBGetMovieType>;
    }
}

export default new ApiMoviesService();
