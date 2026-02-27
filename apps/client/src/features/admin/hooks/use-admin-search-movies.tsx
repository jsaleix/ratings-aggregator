import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

import { type FiltersType } from "./use-filters";
import ApiAdminMoviesService from "../services/movies.admin.service";

export default function useAdminSearchMovies(
    filters: FiltersType,
    title?: string,
    year?: number,
) {
    const { refetch, data, isFetching, isFetched, hasNextPage, fetchNextPage } =
        useInfiniteQuery({
            queryKey: ["adminFindAllMovies", title, year],
            queryFn: async ({ pageParam = 1 }) => {
                const { order, orderBy } = filters;
                const response = await ApiAdminMoviesService.findAll({
                    year,
                    title,
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
    const movies = useMemo(() => {
        return data?.pages.flatMap((page) => page.items) ?? [];
    }, [data]);

    useEffect(() => {
        refetch();
    }, [filters]);

    return {
        refetch,
        movies,
        isFetching,
        isFetched,
        fetchNextPage,
        currentPage,
        hasNextPage,
    };
}
