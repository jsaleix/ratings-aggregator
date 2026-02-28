import { useMutation, useQuery } from "@tanstack/react-query";

import { displayMsg } from "../../../shared/utils/toast";
import ApiAdminMoviesService from "../services/movies.admin.service";

export default function useAdminMovie(
    movieId?: string,
    deleteSuccessCb?: Function,
) {
    const { data: movie, isFetching: isMovieFetching } = useQuery({
        queryKey: ["getMovie", movieId],
        queryFn: async () => {
            if (!movieId) throw new Error("missing id");
            return ApiAdminMoviesService.getById(movieId);
        },
        initialData: null,
        refetchOnWindowFocus: false,
    });

    const { mutate: deleteMovieMutation } = useMutation({
        mutationFn: async () => {
            if (!movieId) throw new Error("No movie provided");
            if (!window.confirm("Are you sure?"))
                throw new Error("Action canceled");
            return ApiAdminMoviesService.delete(movieId);
        },
        onSuccess: () => {
            displayMsg("Movie successfully deleted", "success");
            if (deleteSuccessCb) deleteSuccessCb();
        },
        onError: (e) => {
            displayMsg(e.message, "error");
        },
    });

    return { movie, isMovieFetching, deleteMovieMutation };
}
