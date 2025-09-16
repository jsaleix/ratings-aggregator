import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import apiMoviesService from "../services/api-movies.service";
import { mapApiResponseToModel } from "../models/full-movie";

export default function useMovieInfo(initialMovieId?: string) {
    const [movieId, setMovieId] = useState<string | null>(
        initialMovieId ?? null
    );
    const { data } = useQuery({
        queryKey: ["full-movie", movieId],
        queryFn: async () => {
            if (!movieId) return null;
            const data = await apiMoviesService.getFullMovie(movieId);
            return mapApiResponseToModel(data);
        },
        enabled: !!movieId,
        initialData: null,
        refetchOnWindowFocus: false,
    });

    return { setMovieId, movieId, movieInfo: data };
}
