import { useMemo } from "react";
import type { MovieModel } from "../types/movie";
import { BASE_POSTER_URL } from "../../../core/config/misc";
import { Link } from "react-router";

interface Props {
    movie: MovieModel;
}

export default function MovieListItem({ movie }: Props) {
    const posterUrl = useMemo(
        () => BASE_POSTER_URL + movie.poster_path,
        [movie]
    );

    const summary = useMemo(() => {
        // If the movie title is one line long, summary is unaltered
        if (movie.title.length <= 15) return movie.summary; 
         // However if it's too long, summary won't fit so hide it
        if (movie.title.length >= 30) return "";
        if (movie.summary.length > 15)
            return `${movie.summary.slice(0, 110)}...`;
        return movie.summary;
    }, [movie]);

    return (
        <article className="flex w-96 max-h-55 overflow-hidden border-1 border-bg-light rounded-xl p-5 gap-5 bg-bg-dark shadow-md shadow-bg-medium">
            <div className="w-55 overflow-hidden object-contain">
                <img
                    src={posterUrl}
                    alt={movie.title}
                    className="w-full h-auto select-none drag-none"
                />
            </div>
            <div className="flex flex-col gap-3 w-full">
                <Link
                    to={`/movies/${movie.id}`}
                    className="flex items-end gap-3 hover:opacity-90  flex-wrap"
                >
                    <h1 className="text-2xl font-bold text-white">
                        {movie.title}
                    </h1>
                    <p className="text-lg text-text-secondary"> {movie.year}</p>
                </Link>
                <p className="font-light text-sm text-text-secondary">
                    {summary}
                </p>
            </div>
        </article>
    );
}
