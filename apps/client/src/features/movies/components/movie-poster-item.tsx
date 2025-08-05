import { Link } from "react-router";
import type { MovieModel } from "../types/movie";
import { useMemo } from "react";
import { BASE_POSTER_URL } from "../../../core/config/misc";

interface Props {
    movie: MovieModel;
}

export default function MoviePosterItem({ movie }: Props) {
    const posterUrl = useMemo(
        () => BASE_POSTER_URL + movie.poster_path,
        [movie]
    );

    return (
        <Link to={`/movies/${movie.id}`} className="hover:opacity-90 duration-150 rounded-md overflow-hidden">
            <div className="w-55 overflow-hidden object-contain shadow-xl">
                <img
                    src={posterUrl}
                    alt={movie.title}
                    className="w-full h-auto select-none drag-none"
                />
            </div>
        </Link>
    );
}
