import { useMemo } from "react";
import { BASE_POSTER_URL } from "../../../../core/config/misc";
import type { TMDBGetMovieType } from "../../types/tmdb";
import clsx from "clsx";

interface Props {
    data: TMDBGetMovieType;
    onClick?: (id: number, title: string) => void;
    selected?: boolean;
}

export default function TMDBMovieItem({ data, onClick, selected }: Props) {
    const posterUrl = useMemo(
        () => (data.poster_path ? BASE_POSTER_URL + data.poster_path : ""),
        [data]
    );

    const containerStyle = clsx(
        "bg-bg-medium px-5 py-3 rounded-md h-32 flex gap-5 w-full duration-200",
        {
            "bg-utils-turquoise-dark": selected,
        },
        {
            "cursor-pointer hover:opacity-80": onClick,
        }
    );

    return (
        <div
            className={containerStyle}
            onClick={() => onClick && onClick(data.id, data.title)}
        >
            <div className="w-55 min-w-55 overflow-hidden object-contain shadow-xl">
                <img
                    src={posterUrl}
                    alt={data.title}
                    className="w-full h-auto select-none drag-none"
                />
            </div>
            <div className="truncate">
                <h2 className="text-2xl font-bold text-white">{data.title}</h2>
                <p className="text-text-secondary">{data.release_date}</p>
                <p className="text-wrap truncate">{data.overview}</p>
            </div>
        </div>
    );
}
