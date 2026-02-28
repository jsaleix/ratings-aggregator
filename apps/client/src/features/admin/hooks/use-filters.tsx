import { useCallback, useState } from "react";

export type MoviesFiltersType = {
    order: "asc" | "desc" | undefined;
    orderBy:
        | "title"
        | "id"
        | "created_at"
        | "updated_at"
        | "release_date"
        | undefined;
};

export default function useBaseFilters() {
    const [filters, setFilters] = useState<MoviesFiltersType>({
        order: "asc",
        orderBy: "created_at",
    });

    const changeOrder = useCallback((order: MoviesFiltersType["order"]) => {
        setFilters((prev) => ({ ...prev, order }));
    }, []);

    const changeOrderBy = useCallback((orderBy: MoviesFiltersType["orderBy"]) => {
        setFilters((prev) => ({ ...prev, orderBy }));
    }, []);

    return {
        filters,
        changeOrder,
        changeOrderBy,
    };
}
