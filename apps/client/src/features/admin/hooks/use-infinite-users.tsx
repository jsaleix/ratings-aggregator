import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

import useBaseFilters from "./use-filters";
import ApiAdminUsersService from "../services/users.admin.service";

export default function useInfiniteUsers() {
    const { filters, changeOrder, changeOrderBy } = useBaseFilters();

    const { refetch, data, isFetching, hasNextPage, fetchNextPage } =
        useInfiniteQuery({
            queryKey: ["getUsers"],
            queryFn: async ({ pageParam = 1 }) => {
                const { order, orderBy } = filters;
                const response = await ApiAdminUsersService.getAll({
                    page: pageParam,
                    order,
                    orderBy,
                });

                return {
                    items: response.data,
                    next: response.pagination.next,
                };
            },
            refetchOnWindowFocus: false,
            initialPageParam: 1,
            getNextPageParam: (lastPage) => lastPage.next,
        });
    const currentPage = data?.pageParams?.length ?? 0;
    const users = useMemo(() => {
        return data?.pages.flatMap((page) => page.items) ?? [];
    }, [data]);

    useEffect(() => {
        refetch();
    }, [filters]);

    return {
        users,
        isFetching,
        fetchNextPage,
        currentPage,
        hasNextPage,
        filters,
        changeOrder,
        changeOrderBy,
    };
}
