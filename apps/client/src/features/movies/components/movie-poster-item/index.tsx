import { Link } from "react-router";
import { useMemo } from "react";
import { formatDistanceToNow } from "date-fns";

import type { MovieModel } from "../../models/movie";
import { BASE_POSTER_URL } from "../../../../core/config/misc";
import UpdatedIcon from "../../../../shared/ui/icons/updated-icon";

interface Props {
    movie: MovieModel;
}

export default function MoviePosterItem({ movie }: Props) {
    const posterUrl = useMemo(
        () => BASE_POSTER_URL + movie.poster_path,
        [movie],
    );

    const lastUpdateString = useMemo(() => {
        if (!movie) return "";
        const date = new Date(movie.updated_at);
        if (isNaN(date.getTime())) return "Unknown";
        return formatDistanceToNow(date, { addSuffix: true });
    }, [movie]);

    return (
        <Link
            to={`/movies/${movie.slug}`}
            className="relative block hover:opacity-90 duration-150 rounded-md overflow-hidden w-55"
        >
            <div className="w-55 overflow-hidden object-contain shadow-xl">
                <img
                    src={posterUrl}
                    alt={movie.title}
                    className="w-full h-auto select-none drag-none"
                />
            </div>
            <div className="absolute bottom-0 w-full h-8 bg-black/80 py-1 px-3 flex items-center justify-between">
                <span className="text-xs capitalize text-text-secondary flex items-center gap-2">
                    <i title="Last updated">
                        <UpdatedIcon />
                    </i>
                    {lastUpdateString}
                </span>
                {/* <div className="flex gap-3">
                    <p className="font-bold">
                        <i>​👍</i>12
                    </p>
                </div> */}
            </div>
        </Link>
    );
}
