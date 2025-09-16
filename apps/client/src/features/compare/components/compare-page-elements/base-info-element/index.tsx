import { useMemo } from "react";
import { Link } from "react-router";

import { BASE_POSTER_URL } from "../../../../../core/config/misc";
import type { MovieModel } from "../../../../movies/types/movie";
import ExternalLinkIcon from "../../../../../shared/ui/icons/external-link-icon";

interface Props {
    data: MovieModel | undefined;
}

export default function BaseInfoElement({ data }: Props) {
    const posterUrl = useMemo(
        () => (data ? BASE_POSTER_URL + data.poster_path : ""),
        [data]
    );

    if (!data) return <div className="w-full md:w-[50%]"></div>;
    return (
        <div className="flex flex-col md:flex-row w-full md:w-[50%] justify-start md:gap-5">
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
                    <h2 className="font-bold text-3xl md:text-xl">
                        {data.title}
                    </h2>
                    {data.release_date !== "" && (
                        <p className="text-text-secondary">
                            {new Date(data.release_date).toLocaleDateString()}
                        </p>
                    )}
                    <Link
                        to={`/movies/${data.id}`}
                        target="_blank"
                        className="flex items-center gap-2 w-fit hover:opacity-75"
                    >
                        Full page
                        {/* <svg
                            width="12"
                            height="12"
                            viewBox="0 0 18 18"
                            fill="none"
                            className="fill-white"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11 0V2H14.59L4.76 11.83L6.17 13.24L16 3.41V7H18V0M16 16H2V2H9V0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V16C0 16.5304 0.210714 17.0391 0.585786 17.4142C0.960859 17.7893 1.46957 18 2 18H16C16.5304 18 17.0391 17.7893 17.4142 17.4142C17.7893 17.0391 18 16.5304 18 16V9H16V16Z"
                                fill="current-color"
                            />
                        </svg> */}
                        <ExternalLinkIcon size={12} className="fill-white" />
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
