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

export const DEFAULT_FILTERS: FiltersType = {
    order: "desc",
    orderBy: "release_date",
};

export default function useMovieFilters(defaultValue?: FiltersType) {
    const [filters, setFilters] = useState<FiltersType>(
        defaultValue ?? {
            order: "desc",
            orderBy: "release_date",
        },
    );

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
