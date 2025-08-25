import { useEffect } from "react";

import { useInView } from "../hooks/use-in-view";
import type { MovieModel } from "../types/movie";
import MovieListItem from "./movie-list-item";

interface Props {
    movies: MovieModel[];
    loadMore?: () => void;
    canLoadMore: boolean;
}

export default function MovieList({ movies, loadMore, canLoadMore }: Props) {
    const { ref, inView: reachedBottom } = useInView();

    useEffect(() => {
        if (!loadMore) return;
        if (reachedBottom && canLoadMore) {
            loadMore();
        }
    }, [reachedBottom]);

    return (
        <div className="flex flex-col">
            {movies.length === 0 && <p>There is no movie</p>}
            {movies.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-3">
                    {movies.map((movie) => (
                        <MovieListItem movie={movie} key={movie.id} />
                    ))}
                </div>
            )}
            <div
                ref={ref}
                className="w-full bottom-0 bg-transparent h-4"
                style={{ height: "10px" }}
            ></div>
        </div>
    );
}
