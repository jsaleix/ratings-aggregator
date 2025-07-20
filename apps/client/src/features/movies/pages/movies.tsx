import { useQuery } from "@tanstack/react-query";
import apiMoviesService from "../services/api-movies.service";
import MovieList from "../components/movie-list";

export default function MoviesPage() {
    const { data: movies } = useQuery({
        queryKey: ["getMovies"],
        queryFn: async () => {
            return apiMoviesService.getAll();
        },
        initialData: [],
        refetchOnWindowFocus: false,
    });

    return (
        <div className="w-full">
            <div className="flex flex-col items-center container mx-auto gap-5 py-5">
                <h1 className="text-2xl font-bol">Movies</h1>
                <MovieList movies={movies} />
            </div>
        </div>
    );
}
