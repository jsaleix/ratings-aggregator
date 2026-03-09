import { Prisma } from "../../../../../generated/prisma";

export const movieJobPipelineSelect = {
    id: true,
    tmdb_id: true,
    movie: true,
    status: true,
    failed_at: true,
    failed_reason: true,
    failed_step: true,
    fetched_at: true,
    rated_at: true,
    summarized_at: true,
    completed_at: true,
} satisfies Prisma.Movie_Job_PipelineSelect;

export const movieJobPipelineCreate = {
    id: true,
    tmdb_id: true,
    movie: true,
    status: true,
    failed_at: true,
    failed_reason: true,
    failed_step: true,
    fetched_at: true,
    rated_at: true,
    summarized_at: true,
    completed_at: true,
} satisfies Prisma.Movie_Job_PipelineSelect;

export type MovieJobPipelineCreateInput = Omit<
    Prisma.Movie_Job_PipelineCreateInput,
    "movie"
> & {
    tmdb_id: number;
};

export type MovieJobPipelineType = Prisma.Movie_Job_PipelineGetPayload<{
    select: typeof movieJobPipelineSelect;
}>;
