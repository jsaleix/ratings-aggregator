import { API_ENDPOINT } from "../../../core/config/api";
import type { MovieModel } from "../types/movie";
import type { GetAllMoviesResponse } from "../types/movie-api";

class ApiMoviesService {
    async getAll(): Promise<MovieModel[]> {
        const url = new URL("/movies", API_ENDPOINT);
        const res = await fetch(url, {
            method: "GET",
        });
        if (!res.ok) {
            throw new Error(`Error fetching movies: ${res.statusText}`);
        }
        return (await res.json()) as MovieModel[];
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
        return await res.json();
    }

    async search(query: string) {
        const url = new URL("/movies/search", API_ENDPOINT);
        url.searchParams.append("query", query);
        const res = await fetch(url, {
            method: "GET",
        });
        if (!res.ok) {
            throw new Error(`Error searching movies: ${res.statusText}`);
        }
        return await res.json();
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
}

export default new ApiMoviesService();
