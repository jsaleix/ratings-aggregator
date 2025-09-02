import PageHeader from "../../../shared/ui/page-header";
import MovieList from "../components/movie-list";
import FiltersPart from "../components/movies-filters";
import useMovieFilters from "../hooks/use-filters";
import useMovies from "../hooks/use-movies";

export default function MoviesPage() {
    const { filters, changeOrder, changeOrderBy } = useMovieFilters();

    const { movies, fetchNextPage, isFetched, hasNextPage } =
        useMovies(filters);

    return (
        <div className="w-full">
            <div className="flex flex-col items-center container mx-auto gap-5 py-5 px-5 md:px-0">
                <PageHeader title="Movies">
                    <FiltersPart
                        filters={filters}
                        changeOrderBy={changeOrderBy}
                        changeOrder={changeOrder}
                    />
                </PageHeader>
                {isFetched && (
                    <MovieList
                        movies={movies}
                        loadMore={fetchNextPage}
                        canLoadMore={hasNextPage}
                    />
                )}
            </div>
        </div>
    );
}
