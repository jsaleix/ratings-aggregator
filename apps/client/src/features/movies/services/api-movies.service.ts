import { API_ENDPOINT } from "../../../core/config/api";
import type { PaginatedResult } from "../../../shared/types/pagination";
import type { TMDBGetMovieType } from "../../requests/types/tmdb";
import type { MovieModel } from "../types/movie";

type SearchMovieParams = {
    title: string;
    order?: "asc" | "desc";
    orderBy?: string;
    page?: number;
};

type GetAllMoviesParams = {
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
            throw new Error(`Error fetching movies: ${res.statusText}`);
        }
        return (await res.json()) as PaginatedResult<MovieModel>;
    }

    async getRandom(): Promise<Array<MovieModel>> {
        const url = new URL("/movies/random", API_ENDPOINT);

        const res = await fetch(url, {
            method: "GET",
        });
        if (!res.ok) {
            throw new Error(`Error fetching movies: ${res.statusText}`);
        }
        return (await res.json()) as Array<MovieModel>;
    }

    async getById(id: string) {
        const url = new URL(`/movies/${id}`, API_ENDPOINT);
        const res = await fetch(url, {
            method: "GET",
        });
        if (!res.ok) {
            throw new Error(
                `Error fetching movie with id ${id}: ${res.statusText}`
            );
        }
        return (await res.json())["movie"] as MovieModel;
    }

    async search(
        params: SearchMovieParams
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
            throw new Error(`Error searching movies: ${res.statusText}`);
        }
        return (await res.json()) as PaginatedResult<MovieModel>;
    }

    async searchByTMDBID(title: string): Promise<Array<TMDBGetMovieType>> {
        const url = new URL("/movies/search-with-tmdb", API_ENDPOINT);

        url.searchParams.append("title", title);

        const res = await fetch(url, {
            method: "GET",
        });
        if (!res.ok) {
            throw new Error(`Error searching movies: ${res.statusText}`);
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
            throw new Error(`Error searching TMDB movies: ${res.statusText}`);
        }
        return await res.json();
    }

    async delete(id: string) {
        const url = new URL(`/movies/${id}`, API_ENDPOINT);
        const res = await fetch(url, {
            method: "DELETE",
        });
        if (!res.ok) {
            throw new Error(
                `Error deleting movie with id ${id}: ${res.statusText}`
            );
        }
        return true;
    }
}

export default new ApiMoviesService();
