import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../../core/auth/provider";
import useMovieBySlug from "./use-movie-by-slug";
import apiRatingsService from "../services/api-ratings.service";
import apiSummaryService from "../services/api-summary.service";

export default function useMoviePage(slug: string | undefined) {
    const { isConnected } = useAuthContext();

    const { movie, isMovieFetching } = useMovieBySlug(slug);
    const movieId = movie?.id;

    const {
        data: rawRatings,
        refetch: refetchRatings,
        isFetching: isRatingsFetching,
    } = useQuery({
        queryKey: ["getMovieRatings", movieId],
        queryFn: async () => {
            if (!isConnected) throw new Error("Not authenticated");
            if (!movieId) throw new Error("missing id");
            return apiRatingsService.getMovieRatings(movieId);
        },
        initialData: [],
        refetchOnWindowFocus: false,
    });

    const { data: summary, refetch: refetchSummary } = useQuery({
        queryKey: ["getMovieRatingsSummary", movieId],
        queryFn: async () => {
            if (!isConnected) throw new Error("Not authenticated");
            if (!movieId) throw new Error("missing id");
            return apiSummaryService.getMovieRatingSummary(movieId);
        },
        initialData: undefined,
        refetchOnWindowFocus: false,
    });

    const refetchAll = async () => {
        await Promise.all([refetchRatings(), refetchSummary()]);
    };

    const ratings = isRatingsFetching ? [] : rawRatings;
    return {
        movie,
        isMovieFetching,
        ratings,
        summary,
        refetchAll,
    };
}
