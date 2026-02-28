import { useMutation, useQuery } from "@tanstack/react-query";

import ApiAdminUsersService from "../services/users.admin.service";
import type { AdminUpdateProfileType } from "../../auth/types/admin";
import { displayMsg } from "../../../shared/utils/toast";

export default function useAdminUser(userId: string) {
    const {
        data: user,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["user-full", userId],
        queryFn: async () => {
            if (!userId) throw new Error("Missing id");
            return await ApiAdminUsersService.getOneFull(userId);
        },
        initialData: null,
        refetchOnWindowFocus: false,
    });

    const { mutate: updateUserMutation } = useMutation({
        mutationFn: async (data: AdminUpdateProfileType) => {
            return await ApiAdminUsersService.updateOneFull(userId, data);
        },
        onSuccess: () => {
            displayMsg("User updated!", "success");
            refetch();
        },
        onError: (e) => {
            displayMsg(e.message, "error");
        },
    });

    return { user, isFetching, updateUserMutation };
}
