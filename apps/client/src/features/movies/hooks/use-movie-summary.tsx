import { useMutation, useQuery } from "@tanstack/react-query";

import { displayMsg } from "../../../shared/utils/toast";
import apiSummaryService from "../services/api-summary.service";
import { useAuthContext } from "../../../core/auth/provider";
import { ROLES } from "../../../core/auth/constants";

export default function useMovieSummary(movieId?: string) {
    const { isConnected, role } = useAuthContext();
    const hasAdminRights =
        !!role && (ROLES.ADMIN === role || ROLES.MOD === role);

    const { data: summary } = useQuery({
        queryKey: ["getMovieRatingsSummary", movieId],
        queryFn: async () => {
            if (!isConnected) throw new Error("Not authenticated");
            if (!movieId) throw new Error("missing id");
            return apiSummaryService.getMovieRatingSummary(movieId);
        },
        initialData: undefined,
        refetchOnWindowFocus: false,
    });

    const { mutate: refreshSummaryMutation } = useMutation({
        mutationFn: async (movieId: string) => {
            if (!hasAdminRights) throw new Error("Unauthorized");
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
            if (!hasAdminRights) throw new Error("Unauthorized");
            if (!window.confirm("Are you sure?"))
                throw new Error("Action canceled");
            return apiSummaryService.delete(id);
        },
        onSuccess: () => {},
        onError: (e) => {
            displayMsg(e.message, "error");
        },
    });

    return { summary, refreshSummaryMutation, deleteSummaryMutation };
}
