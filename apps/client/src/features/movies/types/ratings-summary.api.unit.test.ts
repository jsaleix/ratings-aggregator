import { describe, it, expect } from "vitest";
import { mapRatingsSummaryApiToModel } from "./ratings-summary.api";
import type { ApiRatingsSummaryType } from "./ratings-summary.api";

const mockApiRatingsSummary: ApiRatingsSummaryType = {
    id: "1",
    content: "A great movie with outstanding performances.",
    score: "8.5",
    score_value: 8.5,
    updated_at: "2024-06-01",
    created_at: "2024-01-01",
    movieId: "42",
};

describe("mapRatingsSummaryApiToModel", () => {
    it("should return all fields unchanged", () => {
        const result = mapRatingsSummaryApiToModel(mockApiRatingsSummary);

        expect(result.id).toBe(mockApiRatingsSummary.id);
        expect(result.content).toBe(mockApiRatingsSummary.content);
        expect(result.score).toBe(mockApiRatingsSummary.score);
        expect(result.score_value).toBe(mockApiRatingsSummary.score_value);
        expect(result.updated_at).toBe(mockApiRatingsSummary.updated_at);
        expect(result.created_at).toBe(mockApiRatingsSummary.created_at);
        expect(result.movieId).toBe(mockApiRatingsSummary.movieId);
    });
});
