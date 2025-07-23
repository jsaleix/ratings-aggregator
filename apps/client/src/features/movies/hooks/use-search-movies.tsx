import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import apiMoviesService from "../services/api-movies.service";

export default function UseSearchMovies(query: string) {
    const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ["searchMovies", query],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await apiMoviesService.search({
                title: query,
                page: pageParam,
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

    return { movies, isFetching, fetchNextPage, currentPage, hasNextPage };
}
