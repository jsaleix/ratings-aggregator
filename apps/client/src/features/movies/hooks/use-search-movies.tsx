import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

import apiMoviesService from "../services/api-movies.service";
import { type FiltersType } from "./use-filters";

export default function useSearchMovies(filters: FiltersType, query: string) {
    const { refetch, data, isFetching, isFetched, hasNextPage, fetchNextPage } =
        useInfiniteQuery({
            queryKey: ["searchMovies", query],
            queryFn: async ({ pageParam = 1 }) => {
                const { order, orderBy } = filters;
                const response = await apiMoviesService.search({
                    title: query,
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
        movies,
        isFetching,
        isFetched,
        fetchNextPage,
        currentPage,
        hasNextPage,
    };
}
