import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

import apiMoviesService from "../services/api-movies.service";
import useMovieFilters from "./use-filters";

export default function UseSearchMovies(query: string) {
    const { filters, changeOrder, changeOrderBy } = useMovieFilters();

    const { refetch, data, isFetching, hasNextPage, fetchNextPage } =
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
        fetchNextPage,
        currentPage,
        hasNextPage,
        filters,
        changeOrder,
        changeOrderBy,
    };
}
