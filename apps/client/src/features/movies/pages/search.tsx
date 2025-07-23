import { useSearchParams } from "react-router";
import PageHeader from "../../../shared/ui/page-header";
import MovieList from "../components/movie-list";
import UseSearchMovies from "../hooks/use-search-movies";
import FiltersPart from "../components/movies-filters";

export default function MoviesPage() {
    let [searchParams] = useSearchParams();
    const query = searchParams.get("query") ?? "";
    const { movies, fetchNextPage, filters, changeOrder, changeOrderBy } =
        UseSearchMovies(query);

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
                <MovieList movies={movies} onScrollEnd={fetchNextPage} />
            </div>
        </div>
    );
}
