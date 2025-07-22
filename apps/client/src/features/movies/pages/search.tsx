import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import PageHeader from "../../../shared/ui/page-header";
import apiMoviesService from "../services/api-movies.service";
import MovieList from "../components/movie-list";

export default function MoviesPage() {
    let [searchParams, _] = useSearchParams();
    const query = searchParams.get("query") ?? "";
    const { data } = useQuery({
        queryKey: ["searchMovie", query],
        queryFn: async () => {
            if (!query) throw new Error("missing query");
            return apiMoviesService.search(query);
        },
        initialData: [],
        refetchOnWindowFocus: false,
    });

    return (
        <div className="w-full">
            <div className="flex flex-col items-center container mx-auto gap-5 py-5">
                <PageHeader title={`Results for: ${query}`} />
                <MovieList movies={data} />
            </div>
        </div>
    );
}
