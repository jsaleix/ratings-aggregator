import type { MovieRatingModel } from "../../features/movies/models/movie-rating";

export const RatingMockData = {
    id: "b2d52ea1-34a0-4a9f-b1ec-0b1315d8f9aa",
    movieId: "f576483e-6538-4334-a937-a75256e739fb",
    value: "83%",
    extra: "",
    created_at: "2025-07-20T14:04:10.225Z",
    updated_at: "2025-07-20T14:04:10.225Z",
    source_url: null,
    Rating_Source: {
        id: "rotten_tomatoes",
        code: "rotten_tomatoes",
        name: "Rotten Tomatoes",
        rating_unit: "percentage",
        url: "https://rottentomatoes.com",
        country_code: "US",
    },
} satisfies MovieRatingModel;
