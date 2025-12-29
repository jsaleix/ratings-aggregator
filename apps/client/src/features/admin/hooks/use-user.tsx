import { useMutation, useQuery } from "@tanstack/react-query";

import FullUserMapper from "../mappers/full-user";
import ApiUsersService from "../services/users.service";
import type { AdminUpdateProfileType } from "../../auth/types/admin";
import { displayMsg } from "../../../shared/utils/toast";

export default function useUser(userId: string) {
    const {
        data: user,
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["user-full", userId],
        queryFn: async () => {
            if (!userId) throw new Error("Missing id");
            const res = await ApiUsersService.getOneFull(userId);
            return FullUserMapper.fromApi(res);
        },
        initialData: null,
        refetchOnWindowFocus: false,
    });

    const { mutate: updateUserMutation } = useMutation({
        mutationFn: async (data: AdminUpdateProfileType) => {
            return await ApiUsersService.updateOneFull(userId, data);
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
