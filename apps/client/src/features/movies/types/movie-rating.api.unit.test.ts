import { describe, it, expect } from "vitest";
import { mapRatingApiToModel } from "./movie-rating.api";
import type { ApiMovieRatingType } from "./movie-rating.api";

const mockApiMovieRating: ApiMovieRatingType = {
    id: "1",
    movieId: "42",
    value: "8.5",
    extra: "some extra",
    created_at: "2024-01-01",
    updated_at: "2024-06-01",
    source_url: "https://imdb.com/title/tt1375666",
    rating_source: "imdb",
    rating_unit: "score",
    Rating_Source: {
        id: "rs-1",
        code: "IMDB",
        name: "IMDb",
        rating_unit: "score",
        url: "https://imdb.com",
        country_code: "US",
    },
};

describe("mapRatingApiToModel", () => {
    it("should return all fields unchanged", () => {
        const result = mapRatingApiToModel(mockApiMovieRating);
        expect(result).toEqual(mockApiMovieRating);
    });

    it("should handle null source_url", () => {
        const result = mapRatingApiToModel({
            ...mockApiMovieRating,
            source_url: null,
        });
        expect(result.source_url).toBeNull();
    });

    it("should handle optional fields being undefined", () => {
        const { rating_source, rating_unit, ...withoutOptionals } =
            mockApiMovieRating;
        const result = mapRatingApiToModel(
            withoutOptionals as ApiMovieRatingType,
        );

        expect(result.rating_source).toBeUndefined();
        expect(result.rating_unit).toBeUndefined();
    });
});
