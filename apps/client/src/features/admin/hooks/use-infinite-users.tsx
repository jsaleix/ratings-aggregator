import { useInfiniteQuery } from "@tanstack/react-query";
import useBaseFilters from "./use-filters";
import ApiUsersService from "../services/users.service";
import { useEffect, useMemo } from "react";

export default function useInfiniteUsers() {
    const { filters, changeOrder, changeOrderBy } = useBaseFilters();

    const { refetch, data, isFetching, hasNextPage, fetchNextPage } =
        useInfiniteQuery({
            queryKey: ["getUsers"],
            queryFn: async ({ pageParam = 1 }) => {
                const { order, orderBy } = filters;
                const response = await ApiUsersService.getAll({
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
