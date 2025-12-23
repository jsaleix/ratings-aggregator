import { useMutation, useQuery } from "@tanstack/react-query";

import { displayMsg } from "../../../shared/utils/toast";
import { useAuthContext } from "../../../core/auth/provider";
import { ROLES } from "../../../core/auth/constants";
import apiRatingsService from "../services/api-ratings.service";

export default function useMovieRatings(movieId?: string) {
    const { isConnected, role } = useAuthContext();
    const hasAdminRights =
        !!role && (ROLES.ADMIN === role || ROLES.MOD === role);

    const { data: ratings, refetch } = useQuery({
        queryKey: ["getMovieRatings", movieId],
        queryFn: async () => {
            if (!isConnected) throw new Error("Not authenticated");
            if (!movieId) throw new Error("missing id");
            return apiRatingsService.getMovieRatings(movieId);
        },
        initialData: [],
        refetchOnWindowFocus: false,
    });

    const { mutate: deleteRatingMutation } = useMutation({
        mutationFn: async (id: string) => {
            if (!hasAdminRights) throw new Error("Unauthorized");
            if (!window.confirm("Are you sure?"))
                throw new Error("Action canceled");
            return apiRatingsService.delete(id);
        },
        onSuccess: () => {
            refetch();
        },
        onError: (e) => {
            displayMsg(e.message, "error");
        },
    });

    return { ratings, deleteRatingMutation };
}
