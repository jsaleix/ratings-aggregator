export type PaginatedResult<T> = {
  data: T[];
  pagination: {
    total: number;
    currentPage: number;
    next: number | null;
    prev: number | null;
  };
};
