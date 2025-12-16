export const RATING_SOURCES = {
    ROTTEN_TOMATOES: "rotten_tomatoes",
    ROTTEN_TOMATOES_AUDIENCE: "rotten_tomatoes_audience",
    LETTERBOXD: "letterboxd",
    ALLOCINE_PRESS: "allocine_press",
    ALLOCINE_AUDIENCE: "allocine_audience",
    IMDB: "imdb",
} as const;

export const RATING_UNITS = {
    PERCENTAGE: "percentage",
    STARS: "stars",
    POINTS: "points",
} as const;
