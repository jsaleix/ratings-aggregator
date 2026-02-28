export type PaginatedResult<T> = {
    data: T[];
    pagination: PaginationType;
};

export type PaginationType = {
    total: number;
    currentPage: number;
    next: number | null;
    prev: number | null;
    perPage: number;
};
