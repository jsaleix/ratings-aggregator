import { Link } from "react-router";
import type { MovieWithSummaryModel } from "../../models/movie";
import { useMemo } from "react";
import { BASE_POSTER_URL } from "../../../../core/config/misc";
import AnimatedNumber from "../animated-number";

interface Props {
    movie: Required<MovieWithSummaryModel>;
    index: number;
}

export default function MovieTopItem({ movie, index }: Props) {
    const posterUrl = useMemo(
        () => BASE_POSTER_URL + movie.poster_path,
        [movie],
    );

    return (
        <Link
            to={`/movies/${movie.slug}`}
            className="relative block hover:opacity-90 duration-150 rounded-md overflow-hidden w-70"
        >
            <div className="relative">
                <div className="w-70 h-[420px] overflow-hidden object-contain shadow-xl">
                    <img
                        src={posterUrl}
                        alt={movie.title}
                        className="w-full h-auto select-none drag-none"
                    />
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-30% from-black to-transparent px-5 py-3">
                    <span className="text-4xl">
                        <AnimatedNumber
                            className="font-semibold"
                            duration={0.7}
                            value={movie.ratings_summary.score}
                        />
                        %
                    </span>
                </div>
            </div>
            <div className="flex flex-row items-center gap-3">
                <span className="text-5xl font-bold">{index}</span>
                <div className="flex flex-col gap-0">
                    <p className="text-xl text-white truncate">{movie.title}</p>
                    <p className="text-sm text-text-secondary">{movie.year}</p>
                </div>
            </div>
        </Link>
    );
}
