import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import apiMoviesService from "../services/api-movies.service";

export default function UseMovies() {
    const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ["getMovies"],
        queryFn: async ({ pageParam = 1 }) => {
            console.log(pageParam);
            const response = await apiMoviesService.getAll();

            return {
                items: response,
                next: undefined,
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
