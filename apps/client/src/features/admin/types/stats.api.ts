export type GetAllStatsResponse = {
    users: {
        total: number;
        active: number;
    };
    movies: { total: number };
    requests: { total: number };
};
