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

    return (
        <article className="flex w-96 border-1 border-bg-light rounded-xl p-5 gap-5 bg-bg-dark shadow-md shadow-bg-medium">
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
                    className="flex items-end gap-3 hover:opacity-90"
                >
                    <h1 className="text-2xl font-bold text-white">
                        {movie.title}
                    </h1>
                    <p className="text-lg text-text-secondary"> {movie.year}</p>
                </Link>
                <p className="font-light text-sm text-text-secondary">
                    {movie.summary}
                </p>
            </div>
        </article>
    );
}
