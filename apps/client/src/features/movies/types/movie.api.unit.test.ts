import { describe, it, expect } from "vitest";
import { mapMovieApiToModel, type ApiMovieType } from "./movie.api";

const mockApiMovie: ApiMovieType = {
    id: "1",
    title: "Inception",
    created_at: "2024-01-01",
    tag_line: "Your mind is the scene of the crime",
    summary: "A thief who steals corporate secrets...",
    runtime: 148,
    release_date: "2010-07-16",
    year: 2010,
    budget: 160000000,
    poster_path: "/inception.jpg",
    language: "en",
    original_title: "Inception",
    tmdb_id: 27205,
    imdb_id: "tt1375666",
    slug: "inception",
    Genre: [],
};

describe("mapMovieApiToModel", () => {
    it("should map snake_case API fields to camelCase model fields", () => {
        const result = mapMovieApiToModel(mockApiMovie);

        expect(result.tagLine).toBe(mockApiMovie.tag_line);
        expect(result.imdbId).toBe(mockApiMovie.imdb_id);
        expect(result.tmdbId).toBe(mockApiMovie.tmdb_id);
    });

    it("should not contain raw snake_case API fields", () => {
        const result = mapMovieApiToModel(mockApiMovie);

        expect(result).not.toHaveProperty("tag_line");
        expect(result).not.toHaveProperty("imdb_id");
        expect(result).not.toHaveProperty("tmdb_id");
    });

    it("should preserve all other fields unchanged", () => {
        const result = mapMovieApiToModel(mockApiMovie);

        expect(result.id).toBe(mockApiMovie.id);
        expect(result.title).toBe(mockApiMovie.title);
        expect(result.created_at).toBe(mockApiMovie.created_at);
        expect(result.summary).toBe(mockApiMovie.summary);
        expect(result.runtime).toBe(mockApiMovie.runtime);
        expect(result.release_date).toBe(mockApiMovie.release_date);
        expect(result.year).toBe(mockApiMovie.year);
        expect(result.budget).toBe(mockApiMovie.budget);
        expect(result.poster_path).toBe(mockApiMovie.poster_path);
        expect(result.language).toBe(mockApiMovie.language);
        expect(result.original_title).toBe(mockApiMovie.original_title);
        expect(result.slug).toBe(mockApiMovie.slug);
    });
});
