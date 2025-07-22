import { useMemo } from "react";
import { Link } from "react-router";

import type { MovieModel } from "../types/movie";
import { BASE_POSTER_URL } from "../../../core/config/misc";

interface Props {
    movie: MovieModel;
}

export default function MovieListItem({ movie }: Props) {
    const posterUrl = useMemo(
        () => BASE_POSTER_URL + movie.poster_path,
        [movie]
    );

    const summary = useMemo(() => {
        if (movie.title.length <= 15) {
            if (movie.summary.length > 210)
                return `${movie.summary.slice(0, 150)}...`;
            return movie.summary;
        }
        return "";
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
                    className="flex items-end gap-3  flex-wrap"
                >
                    <h1 className="text-2xl font-bold text-white hover:text-utils-orange-light">
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
