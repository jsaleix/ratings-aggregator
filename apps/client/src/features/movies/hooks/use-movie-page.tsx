import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../../core/auth/provider";
import useMovieBySlug from "./use-movie-by-slug";
import apiRatingsService from "../services/api-ratings.service";
import apiSummaryService from "../services/api-summary.service";

export default function useMoviePage(slug: string | undefined) {
    const { isConnected } = useAuthContext();

    const { movie, isMovieFetching } = useMovieBySlug(slug);

    const {
        data: rawRatings,
        refetch: refetchRatings,
        isFetching: isRatingsFetching,
    } = useQuery({
        queryKey: ["getMovieRatings", slug],
        queryFn: async () => {
            if (!isConnected) throw new Error("Not authenticated");
            if (!slug) throw new Error("Missing slug");
            return apiRatingsService.getMovieRatings(slug);
        },
        initialData: [],
        refetchOnWindowFocus: false,
    });

    const { data: summary, refetch: refetchSummary } = useQuery({
        queryKey: ["getMovieRatingsSummary", slug],
        queryFn: async () => {
            if (!isConnected) throw new Error("Not authenticated");
            if (!slug) throw new Error("Missing slug");
            return apiSummaryService.getMovieRatingSummary(slug);
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
