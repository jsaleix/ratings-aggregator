import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ApiUsersAdminService from "../services/users.admin.service";

export default function useAdminUsers() {
    const [currentPage, setCurrentPage] = useState(1);

    const { refetch, data, isFetching, isFetched } = useQuery({
        queryKey: ["adminGetAllUsers", currentPage],
        queryFn: async () => {
            const response = await ApiUsersAdminService.getAll({
                page: currentPage,
            });

            return response;
        },
        refetchOnWindowFocus: false,
    });

    return {
        users: data?.data ?? [],
        pagination: data?.pagination,
        isFetching,
        isFetched,
        currentPage,
        setCurrentPage,
        refetch,
    };
}
