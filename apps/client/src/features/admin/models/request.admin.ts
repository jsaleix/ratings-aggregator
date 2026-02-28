export type RequestAdminModel = {
    id: string;
    created_at: string;
    tmdb_id: string;
    processed: boolean;
    title: string;
    creator: {
        id: string;
        username: string;
        email: string;
    };
};
