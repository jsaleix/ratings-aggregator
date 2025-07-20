import { useQuery } from "@tanstack/react-query";
import apiMoviesService from "../services/api-movies.service";
import MovieList from "../components/movie-list";

export default function HomePage() {
    const { data: movies, isFetching } = useQuery({
        queryKey: ["getMovies"],
        queryFn: async () => {
            return apiMoviesService.getAll();
        },
        initialData: [],
        refetchOnWindowFocus: false,
    });

    return (
        <div className="flex flex-col">
            <MovieList movies={movies} />
        </div>
    );
}
