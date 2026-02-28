import { Link } from "react-router";
import clsx from "clsx";
import { formatDistanceToNow } from "date-fns";

import Button from "../../../../../shared/ui/button";
import type { MovieModel } from "../../../../movies/models/movie";

interface Props {
    movies: MovieModel[];
    checkedMovies: number[];
    onCheckChange: (movieId: number) => void;
    onCheckAll: () => void;
    onSelectMovie: (movie: MovieModel) => void;
}

export default function MoviesTable({
    movies,
    checkedMovies,
    onCheckChange,
    onCheckAll,
    onSelectMovie,
}: Props) {
    return (
        <div className="flex flex-col w-full">
            <table>
                <thead className="w-full bg-bg-medium text-left uppercase">
                    <tr>
                        <th className="px-3 w-2.5">
                            <input
                                type="checkbox"
                                checked={checkedMovies.length === movies.length}
                                onChange={onCheckAll}
                            />
                        </th>
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
                            <td className="px-3 w-2.5">
                                <input
                                    type="checkbox"
                                    checked={checkedMovies.includes(
                                        movie.tmdbId,
                                    )}
                                    onChange={() => onCheckChange(movie.tmdbId)}
                                />
                            </td>
                            <td title={movie.id} className="max-w-[120px]">
                                <Link
                                    className="underline hover:opacity-80"
                                    to={`/movies/${movie.slug}`}
                                    target="_blank"
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
                            <td className="w-[100px]">{movie.year}</td>
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
                                    onClick={() => onSelectMovie(movie)}
                                >
                                    Actions
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
