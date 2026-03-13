export const MOVIE_STATUS = {
    FETCHING: "FETCHING",
    RATING: "RATING",
    SUMMARIZING: "SUMMARIZING",
    COMPLETE: "COMPLETE",
    FAILED: "FAILED",
} as const;

export type MovieStatusType = (typeof MOVIE_STATUS)[keyof typeof MOVIE_STATUS];
