import { useMutation } from "@tanstack/react-query";

import { ROLES } from "../../../core/auth/constants";
import { useAuthContext } from "../../../core/auth/provider";
import { displayMsg } from "../../../shared/utils/toast";

export default function useMovieAdmin() {
    const { role } = useAuthContext();
    const enabled = !!role && (ROLES.ADMIN === role || ROLES.MOD === role);

    const { mutate: deleteSummaryMutation } = useMutation({
        mutationFn: async (id: string) => {
            if (enabled) throw new Error("Unauthorized");
            if (!window.confirm("Are you sure?"))
                throw new Error("Action canceled");
            console.log(id);
        },
        onSuccess: () => {},
        onError: (e) => {
            displayMsg(e.message, "error");
        },
    });

    const { mutate: deleteRatingMutation } = useMutation({
        mutationFn: async (id: string) => {
            if (enabled) throw new Error("Unauthorized");
            if (!window.confirm("Are you sure?"))
                throw new Error("Action canceled");
            console.log(id);
        },
        onSuccess: () => {},
        onError: (e) => {
            displayMsg(e.message, "error");
        },
    });

    return { enabled, deleteRatingMutation, deleteSummaryMutation };
}
