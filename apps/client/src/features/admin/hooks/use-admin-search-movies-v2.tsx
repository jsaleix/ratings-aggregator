import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { type FiltersType } from "./use-filters";
import ApiAdminMoviesService from "../services/movies.admin.service";

export default function useAdminSearchMoviesV2(
    filters: FiltersType,
    title?: string,
    year?: number,
) {
    const [currentPage, setCurrentPage] = useState(1);

    // Reset page si les filtres/recherche changent
    useEffect(() => {
        setCurrentPage(1);
    }, [filters, title, year]);

    const { refetch, data, isFetching, isFetched } = useQuery({
        queryKey: ["adminFindAllMovies", title, year, filters, currentPage],
        queryFn: async () => {
            const { order, orderBy } = filters;
            const response = await ApiAdminMoviesService.findAll({
                year,
                title,
                page: currentPage,
                order,
                orderBy,
            });

            return response;
        },
        refetchOnWindowFocus: false,
    });

    return {
        movies: data?.data ?? [],
        pagination: data?.pagination,
        isFetching,
        isFetched,
        currentPage,
        setCurrentPage,
        refetch,
    };
}
