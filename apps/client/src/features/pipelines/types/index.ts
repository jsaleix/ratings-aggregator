import type { MovieStatusType } from "../constants";

export type MovieJobPipelineType = {
    id: string;
    tmdb_id: number;

    status: MovieStatusType;

    movie: null | {
        slug: string;
        title: string;
        year: number;
    };
};
