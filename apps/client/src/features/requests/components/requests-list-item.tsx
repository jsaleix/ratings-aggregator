import type { MovieRequestModel } from "../models/movie-request";

interface Props {
    request: MovieRequestModel;
}

export default function RequestListItem({ request }: Props) {
    const url = new URL(
        request.tmdbId.toString(),
        "https://www.themoviedb.org/movie/"
    );

    return (
        <article className="w-full flex md:flex-row flex-col gap-1 justify-between border-b-1 border-b-bg-light px-5 py-3">
            <div className="flex flex-col">
                <h2 className="text-xl text-white">
                    #<span>{request.tmdbId}</span>
                </h2>
                <a
                    href={url.toString()}
                    target="_blank"
                    className="text-utils-orange hover:underline"
                >
                    See the TMDB page
                </a>
            </div>

            <div className="flex flex-col md:items-end">
                <p className="font-light">
                    Created at:{" "}
                    <span className="font-medium">
                        {new Date(request.created_at).toLocaleString()}
                    </span>
                </p>
                <p>
                    Status: <span>N/A</span>
                </p>
            </div>
        </article>
    );
}
