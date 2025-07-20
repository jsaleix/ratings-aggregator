import type { MovieModel } from "../types/movie";
import MovieListItem from "./movie-list-item";

interface Props {
    movies: MovieModel[];
}

export default function MovieList({ movies }: Props) {
    return (
        <div className="flex flex-col">
            {movies.length === 0 && <p>There is no movie</p>}
            {movies.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {movies.map((movie) => (
                        <MovieListItem movie={movie} key={movie.id} />
                    ))}
                </div>
            )}
        </div>
    );
}
