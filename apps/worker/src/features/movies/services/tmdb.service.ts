import { TMDB_TOKEN } from "../../../config/tmdb";
import { MovieCreateInput } from "../types/db";
import { TMDBGetMovieType } from "../types/tmdb";

const authHeaders = { Authorization: `Bearer ${TMDB_TOKEN}` };

class TMDBService {
    constructor() {}

    async getMovieById(movieId: number): Promise<TMDBGetMovieType> {
        const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
        const res = await fetch(url, {
            method: "GET",
            headers: { ...authHeaders },
        });
        if (!res.ok) throw new Error("Movie not found");
        return res.json();
    }

    async getPopulars(): Promise<TMDBGetMovieType[]> {
        const url =
            "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
        const raw = await fetch(url, {
            method: "GET",
            headers: { ...authHeaders },
        });
        if (!raw.ok) throw new Error();
        const res = await raw.json();
        if (!res?.results || !Array.isArray(res.results)) throw new Error();
        return res.results as TMDBGetMovieType[];
    }

    async findMovie(name: string, year?: number): Promise<TMDBGetMovieType[]> {
        let url = `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=1`;
        if (year) url += `&year=${year}`;

        const raw = await fetch(url, {
            method: "GET",
            headers: { ...authHeaders },
        });
        if (!raw.ok) throw new Error();
        const res = await raw.json();
        if (!res?.results || !Array.isArray(res.results)) throw new Error();
        return res.results as TMDBGetMovieType[];
    }

    mapApiResponseToModel(
        tmdbMovie: TMDBGetMovieType,
    ): Omit<MovieCreateInput, "slug"> {
        let {
            id: tmdb_id,
            title,
            tagline,
            overview: summary,
            budget,
            poster_path,
            release_date: rawReleaseDate,
            runtime,
            original_language,
            original_title,
            imdb_id,
        } = tmdbMovie;

        const year = rawReleaseDate
            ? new Date(rawReleaseDate).getFullYear()
            : -1;

        const release_date = new Date(rawReleaseDate).toISOString();

        if (!tmdb_id || !title || !summary || !poster_path || !release_date) {
            throw new Error("Missing required movie data");
        }

        return {
            tmdb_id,
            title,
            tag_line: tagline || "",
            summary,
            budget: budget || -1,
            year,
            poster_path,
            release_date: new Date(release_date),
            runtime: runtime ? +runtime : -1,
            imdb_id,
            original_title,
            language: original_language,
        } satisfies Omit<MovieCreateInput, "slug">;
    }
}

export default TMDBService;
