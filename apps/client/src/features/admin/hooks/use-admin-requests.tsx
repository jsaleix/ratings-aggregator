import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import ApiAdminRequestsService from "../services/requests.admin.service";
import { displayMsg } from "../../../shared/utils/toast";

export const useAdminRequests = () => {
    const [page, setPage] = useState(1);
    const [isProcessed, setIsProcessed] = useState<boolean | undefined>(
        undefined,
    );

    const { data, isFetched, refetch } = useQuery({
        queryKey: ["getRequests", page, isProcessed],
        queryFn: () =>
            ApiAdminRequestsService.getAll({ page, processed: isProcessed }),
        refetchOnWindowFocus: false,
        refetchInterval: 15000,
    });

    const { mutate: deleteRequestMutation } = useMutation({
        mutationFn: async (requestId: string) => {
            if (!window.confirm("Are you sure?"))
                throw new Error("Action canceled");
            return await ApiAdminRequestsService.delete(requestId);
        },
        onSuccess: () => {
            displayMsg("Request deleted!", "success");
            refetch();
        },
        onError: (e) => {
            displayMsg(e.message, "error");
        },
    });

    return {
        deleteRequestMutation,
        page,
        setPage,
        isProcessed,
        setIsProcessed,
        requests: data?.data ?? [],
        pagination: data?.pagination,
        isEmpty: isFetched && (data?.data ?? []).length === 0,
        isLoading: !isFetched,
        refetch,
    };
};
