import { useQuery } from "@tanstack/react-query";

import apiMoviesService from "../services/api-movies.service";

export default function useMovieBySlug(slug?: string) {
    const { data: movie, isFetching: isMovieFetching } = useQuery({
        queryKey: ["getMovieBySlug", slug],
        queryFn: async () => {
            if (!slug) throw new Error("Missing slug");
            return apiMoviesService.getBySlug(slug);
        },
        initialData: null,
        refetchOnWindowFocus: false,
    });
    return { movie, isMovieFetching };
}
