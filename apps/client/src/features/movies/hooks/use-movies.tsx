import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

import apiMoviesService from "../services/api-movies.service";
import useMovieFilters from "./use-filters";

export default function useMovies() {
    const { filters, changeOrder, changeOrderBy } = useMovieFilters();

    const { refetch, data, isFetching,isFetched, hasNextPage, fetchNextPage } =
        useInfiniteQuery({
            queryKey: ["getMovies"],
            queryFn: async ({ pageParam = 1 }) => {
                const { order, orderBy } = filters;
                const response = await apiMoviesService.getAll({
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
        filters,
        changeOrder,
        changeOrderBy,
    };
}
