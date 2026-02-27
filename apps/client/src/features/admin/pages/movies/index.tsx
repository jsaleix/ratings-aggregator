import { useCallback, useState } from "react";
import { useDebounce } from "use-debounce";
import { Link, useSearchParams } from "react-router";
import clsx from "clsx";
import { formatDistanceToNow } from "date-fns";

import PageHeader from "../../../../shared/ui/page-header";
import Button from "../../../../shared/ui/button";
import Input from "../../../../shared/ui/input";
import useMovieFilters from "../../../movies/hooks/use-filters";
import { type MovieModel } from "../../../movies/models/movie";
import MovieModal from "../../components/movies/movie-modal";
import useAdminSearchMovies from "../../hooks/use-admin-search-movies";

export default function MoviesPage() {
    let [searchParams] = useSearchParams();
    const [title, setTitle] = useState(searchParams.get("title") ?? "");
    const [year, _] = useState(searchParams.get("year") ?? "");
    const [debouncedTitle] = useDebounce(title, 500);
    const { filters } = useMovieFilters();
    const { refetch, movies, isFetched } = useAdminSearchMovies(
        filters,
        debouncedTitle,
        year ? +year : undefined,
    );
    const [selectedMovie, setSelectedMovie] = useState<MovieModel | null>(null);

    const onCloseModal = useCallback(() => {
        setSelectedMovie(null);
        refetch();
    }, []);

    return (
        <div className="w-full max-w-screen">
            <div className="flex flex-col items-center container mx-auto gap-5 pb-5 md:py-5">
                <PageHeader title="Movies">
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Movie title"
                    />
                </PageHeader>
                {isFetched && movies.length === 0 && (
                    <p className="text-md italic text-text-secondary">
                        There is no movie
                    </p>
                )}
                {!isFetched && <p>Loading...</p>}
                {movies.length > 0 && (
                    <div className="flex flex-col w-full">
                        <table>
                            <thead className="w-full bg-bg-medium text-left">
                                <tr>
                                    <th className="">Title</th>
                                    <th className="">Year</th>
                                    <th className="">Last update</th>
                                    <th className="">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {movies.map((movie, idx) => (
                                    <tr
                                        key={movie.id}
                                        className={clsx(
                                            idx % 2 === 0
                                                ? "bg-bg-medium/50"
                                                : "bg-bg-medium",
                                        )}
                                    >
                                        <td title={movie.id}>
                                            <Link
                                                className="underline hover:opacity-80"
                                                to={`/movies/${movie.id}`}
                                                target="_blankl"
                                            >
                                                <span className="text-white">
                                                    {movie.title}
                                                </span>{" "}
                                                /{" "}
                                                <span className="text-text-secondary">
                                                    {movie.original_title}
                                                </span>
                                            </Link>
                                        </td>
                                        <td>{movie.year}</td>
                                        <td>
                                            {formatDistanceToNow(
                                                new Date(movie.updated_at),
                                                { addSuffix: true },
                                            )}
                                        </td>
                                        <td className="flex gap-3">
                                            <Button
                                                size={"small"}
                                                variant={"primary"}
                                                onClick={() =>
                                                    setSelectedMovie(movie)
                                                }
                                            >
                                                Actions
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <MovieModal movie={selectedMovie} onClose={onCloseModal} />
        </div>
    );
}
