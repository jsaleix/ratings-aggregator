import { useMutation, useQuery } from "@tanstack/react-query";

import { displayMsg } from "../../../shared/utils/toast";
import apiAdminRatingsService from "../services/ratings.admin.service";

export default function useAdminMovieRatings(movieId?: string) {
    const { data: ratings, refetch: refetchRatings } = useQuery({
        queryKey: ["getMovieRatings", movieId],
        queryFn: async () => {
            if (!movieId) throw new Error("missing id");
            return apiAdminRatingsService.getMovieRatings(movieId);
        },
        initialData: [],
        refetchOnWindowFocus: false,
    });

    const { mutate: deleteRatingMutation } = useMutation({
        mutationFn: async (id: string) => {
            if (!window.confirm("Are you sure?"))
                throw new Error("Action canceled");
            return apiAdminRatingsService.delete(id);
        },
        onSuccess: () => {
            refetchRatings();
        },
        onError: (e) => {
            displayMsg(e.message, "error");
        },
    });

    return { ratings, deleteRatingMutation, refetchRatings };
}
