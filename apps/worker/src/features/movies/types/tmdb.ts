export type TMDBGenreType = {
    id: number;
    name: string;
};

export type TMDBGetMovieType = {
    id: number;
    title: string;
    original_title: string;
    tagline?: string;
    overview: string; // Summary
    budget?: number;
    genre: Array<TMDBGenreType>;
    poster_path: string;
    release_date: string;
    runtime?: string;
};
