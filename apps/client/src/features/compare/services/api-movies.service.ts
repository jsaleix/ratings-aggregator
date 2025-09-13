import { API_ENDPOINT } from "../../../core/config/api";
import type { CompareMoviesApiResponse } from "../types/api";

class ApiComparingService {
    async compareMovies(movieAIdx: string, movieBIdx: string) {
        const url = new URL("/compare/movies", API_ENDPOINT);
        url.searchParams.append("movieA", movieAIdx);
        url.searchParams.append("movieB", movieBIdx);
        const res = await fetch(url, {
            method: "GET",
        });
        if (!res.ok) {
            throw new Error(
                `Error fetching comparaison data: ${res.statusText}`
            );
        }
        return (await res.json()) as CompareMoviesApiResponse;
    }
}

export default new ApiComparingService();
