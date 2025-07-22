import MovieList from "../components/movie-list";
import PageHeader from "../../../shared/ui/page-header";
import UseMovies from "../hooks/use-movies";

export default function MoviesPage() {
    const { movies, fetchNextPage } = UseMovies();

    return (
        <div className="w-full">
            <div className="flex flex-col items-center container mx-auto gap-5 py-5">
                <PageHeader title="Movies" />
                <MovieList movies={movies} onScrollEnd={fetchNextPage} />
            </div>
        </div>
    );
}
