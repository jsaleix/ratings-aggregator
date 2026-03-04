import { Link } from "react-router";
import { formatDistanceToNow } from "date-fns";

import Button from "../../../../../shared/ui/button";
import Table from "../../../../../shared/ui/table";
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
    const columns = [
        {
            header: (
                <input
                    type="checkbox"
                    checked={checkedMovies.length === movies.length}
                    onChange={onCheckAll}
                />
            ),
            key: "check_all",
        },
        {
            header: "Title",
            key: "title",
        },
        {
            header: "Year",
            key: "year",
        },
        {
            header: "Last update",
            key: "last_updated",
        },
        {
            header: "Actions",
            key: "actions",
        },
    ];
    return (
        <Table<MovieModel>
            columns={columns}
            data={movies}
            renderRow={(movie, idx) => (
                <Table.Row idx={idx}>
                    <Table.Cell className="">
                        <input
                            type="checkbox"
                            checked={checkedMovies.includes(movie.tmdbId)}
                            onChange={() => onCheckChange(movie.tmdbId)}
                        />
                    </Table.Cell>
                    <Table.Cell className="max-w-[120px]">
                        <Link
                            className="underline hover:opacity-80"
                            to={`/movies/${movie.slug}`}
                            target="_blank"
                        >
                            <span className="text-white">{movie.title}</span> /{" "}
                            <span className="text-text-secondary">
                                {movie.original_title}
                            </span>
                        </Link>
                    </Table.Cell>
                    <Table.Cell className="w-[100px]">{movie.year}</Table.Cell>
                    <Table.Cell>
                        {formatDistanceToNow(new Date(movie.updated_at), {
                            addSuffix: true,
                        })}
                    </Table.Cell>
                    <Table.Cell className="flex gap-3">
                        <Button
                            size={"small"}
                            variant={"primary"}
                            onClick={() => onSelectMovie(movie)}
                        >
                            Actions
                        </Button>
                    </Table.Cell>
                </Table.Row>
            )}
        ></Table>
    );
}
