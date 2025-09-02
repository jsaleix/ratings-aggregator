import { useCallback, useState } from "react";

export type FiltersType = {
    order: "asc" | "desc" | undefined;
    orderBy:
        | "title"
        | "id"
        | "created_at"
        | "release_date"
        | "updated_at"
        | undefined;
};

export default function useMovieFilters() {
    const [filters, setFilters] = useState<FiltersType>({
        order: "desc",
        orderBy: "release_date",
    });

    const changeOrder = useCallback((order: FiltersType["order"]) => {
        setFilters((prev) => ({ ...prev, order }));
    }, []);

    const changeOrderBy = useCallback((orderBy: FiltersType["orderBy"]) => {
        setFilters((prev) => ({ ...prev, orderBy }));
    }, []);

    return {
        filters,
        changeOrder,
        changeOrderBy,
    };
}
