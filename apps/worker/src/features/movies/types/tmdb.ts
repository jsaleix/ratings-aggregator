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
    genres: Array<TMDBGenreType>;
    poster_path: string;
    release_date: string;
    runtime?: number;
    adult: boolean;
    imdb_id: string;
    original_language: string
};
