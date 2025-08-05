import { useEffect } from "react";
import { Link } from "react-router";
import useMovies from "../hooks/use-movies";
import MoviePosterItem from "./movie-poster-item";

interface Props {
    maxResults?: number;
}

export default function LastMoviesAdded({ maxResults = 4 }: Props) {
    const { movies, changeOrderBy } = useMovies();

    useEffect(() => {
        changeOrderBy("created_at");
    }, []);

    return (
        <section className="bg-bg-light w-full">
            <div className="bg-bg-light container mx-auto px-5 md:px-0">
                <div className="flex flex-col py-5 gap-3 items-center">
                    <div className="w-full flex justify-between">
                        <h2 className="text-black text-xl">
                            Last {maxResults} movies added
                        </h2>
                        <Link
                            to="/movies"
                            className="text-black hover:underline"
                        >
                            See all
                        </Link>
                    </div>

                    {movies.length === 0 && (
                        <p className="text-slate-800">No movie found</p>
                    )}
                    {movies.length > 0 && (
                        <div className="flex gap-3 w-full flex-wrap justify-center">
                            {movies.slice(0, maxResults).map((movie) => (
                                <MoviePosterItem movie={movie} key={movie.id} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
