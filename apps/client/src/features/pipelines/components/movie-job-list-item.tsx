import Spinner from "../../../shared/ui/spinner";
import type { MovieJobPipelineType } from "../types";

interface Props {
    job: MovieJobPipelineType;
}

export default function MovieJobListItem({ job }: Props) {
    const url = new URL(
        job.tmdb_id.toString(),
        "https://www.themoviedb.org/movie/",
    );

    return (
        <article className="w-full flex md:flex-row items-center flex-col gap-1 justify-between border-b-1 border-b-bg-light px-5 py-3">
            <div className="flex flex-row items-center">
                <Spinner />
                {!job.movie && (
                    <div className="flex flex-col">
                        <h2 className="text-xl text-white">
                            #<span>{job.tmdb_id}</span>
                        </h2>
                        <a
                            href={url.toString()}
                            target="_blank"
                            className="text-utils-orange hover:underline"
                        >
                            See the TMDB page
                        </a>
                    </div>
                )}
                {job.movie && (
                    <div className="flex flex-col">
                        <h2 className="text-xl text-white">
                            <span>
                                {job.movie.title} ({job.movie.year})
                            </span>
                        </h2>
                        <a
                            href={`/movies/${job.movie.slug}`}
                            target="_blank"
                            className="text-utils-orange hover:underline"
                        >
                            See the page
                        </a>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-1 items-center">
                <div className="flex flex-row md:items-end gap-1">
                    {/* <span className="font-light text-md">Step:</span> */}
                    <span className="font-semibold text-xl">{job.status}...</span>
                </div>
            </div>
        </article>
    );
}
