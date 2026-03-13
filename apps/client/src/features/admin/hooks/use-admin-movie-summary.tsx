import { useMutation, useQuery } from "@tanstack/react-query";

import { displayMsg } from "../../../shared/utils/toast";
import apiSummaryService from "../../movies/services/api-summary.service";

export default function useAdminMovieSummary(movieId?: string) {
    const { data: summary, refetch: refetchSummary } = useQuery({
        queryKey: ["getMovieRatingsSummary", movieId],
        queryFn: async () => {
            if (!movieId) throw new Error("missing id");
            return apiSummaryService.getMovieRatingSummary(movieId);
        },
        initialData: undefined,
        refetchOnWindowFocus: false,
    });

    const { mutate: refreshSummaryMutation } = useMutation({
        mutationFn: async (movieId: string) => {
            if (!window.confirm("Are you sure?"))
                throw new Error("Action canceled");
            return apiSummaryService.refresh(movieId);
        },
        onSuccess: () => {},
        onError: (e) => {
            displayMsg(e.message, "error");
        },
    });

    const { mutate: deleteSummaryMutation } = useMutation({
        mutationFn: async (id: string) => {
            if (!window.confirm("Are you sure?"))
                throw new Error("Action canceled");
            return apiSummaryService.delete(id);
        },
        onSuccess: () => {},
        onError: (e) => {
            displayMsg(e.message, "error");
        },
    });

    return {
        summary,
        refreshSummaryMutation,
        deleteSummaryMutation,
        refetchSummary,
    };
}
