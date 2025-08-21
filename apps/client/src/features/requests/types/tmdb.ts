export type TMDBGetMovieType = {
    id: number;
    title: string;
    original_title: string;
    tagline?: string;
    overview: string; // Summary
    budget?: number;
    poster_path: string | null;
    release_date: string;
    runtime?: number;
    adult: boolean;
};
