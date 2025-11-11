import { useSearchParams } from "react-router";

import PageHeader from "../../../shared/ui/page-header";
import useSearchMovies from "../hooks/use-search-movies";
import useMovieFilters from "../hooks/use-filters";
import MovieList from "../components/movie-list";
import FiltersPart from "../components/movies-filters";

export default function MoviesPage() {
    let [searchParams] = useSearchParams();
    const query = searchParams.get("query") ?? "";
    const { filters, changeOrder, changeOrderBy } = useMovieFilters();

    const { movies, fetchNextPage, hasNextPage, isFetched } = useSearchMovies(
        filters,
        query
    );

    return (
        <div className="w-full">
            <div className="flex flex-col items-center container mx-auto gap-5 py-5">
                <PageHeader title={`Results for: ${query}`}>
                    <FiltersPart
                        filters={filters}
                        changeOrderBy={changeOrderBy}
                        changeOrder={changeOrder}
                    />
                </PageHeader>
                {isFetched && (
                    <MovieList
                        canLoadMore={hasNextPage}
                        movies={movies}
                        loadMore={fetchNextPage}
                    />
                )}
            </div>
        </div>
    );
}
