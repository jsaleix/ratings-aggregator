import { useMemo } from "react";
import { BASE_POSTER_URL } from "../../../../core/config/misc";
import movie from "../../../movies/pages/movie";
import type { MovieModel } from "../../../movies/types/movie";
import { Link } from "react-router";

interface Props {
    data: MovieModel;
}

export default function BaseInfoElement({ data }: Props) {
    const posterUrl = useMemo(
        () => (data ? BASE_POSTER_URL + data.poster_path : ""),
        [movie]
    );
    return (
        <div className="flex flex-col md:flex-row w-[50%] justify-start md:gap-5">
            <div className="flex justify-start overflow-hidden aspect-[9/16] w-[200px] h-[350px]">
                <img
                    width={200}
                    height={350}
                    src={posterUrl}
                    alt={data.title}
                    className="w-full h-full object-contain select-none pointer-events-none"
                />
            </div>
            <div className="flex flex-col grow md:py-5 gap-3">
                <div className="flex flex-col">
                    <h2 className="font-bold text-xl">{data.title}</h2>
                    {data.release_date !== "" && (
                        <p className="text-text-secondary">
                            {new Date(data.release_date).toLocaleDateString()}
                        </p>
                    )}
                    <Link to={`/movies/${data.id}`} target="_blank">
                        Full page
                    </Link>
                </div>

                <div className="flex flex-col">
                    <p className="text-white">
                        {data.runtime.toLocaleString()} minutes
                    </p>
                    {data.budget !== -1 && (
                        <p className="bg-secondary px-1 text-black w-fit select-none font-bold">
                            ${data.budget.toLocaleString()}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
