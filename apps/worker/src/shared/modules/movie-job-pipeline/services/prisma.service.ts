import { PrismaClient } from "../../../../../generated/prisma";
import { db } from "../../../../core/db";
import { MOVIE_STATUS, type MovieStatusType } from "../constants";
import { MovieJobPipelineServiceI } from "../interfaces";
import { type MovieJobPipelineCreateInput } from "../types/db";

export class PrismaMovieJobPipelineService implements MovieJobPipelineServiceI {
    db: PrismaClient;

    constructor() {
        this.db = db;
    }

    async setFetching(movie_id: string): Promise<void> {
        const updatedAt = new Date().toISOString();
        const payload = {
            movie_id,

            status: MOVIE_STATUS.FETCHING,
            failed_step: null,
            failed_at: null,
            failed_reason: null,

            fetched_at: updatedAt,
            rated_at: null,
            summarized_at: null,
            completed_at: null,
        } satisfies MovieJobPipelineCreateInput;

        await this.db.movie_Job_Pipeline.upsert({
            where: { movie_id },
            create: payload,
            update: payload,
        });
    }

    async setRating(movie_id: string): Promise<void> {
        const updatedAt = new Date().toISOString();
        const payload = {
            movie_id,

            status: MOVIE_STATUS.RATING,
            failed_step: null,
            failed_at: null,
            failed_reason: null,

            rated_at: updatedAt,
            summarized_at: null,
            completed_at: null,
        } satisfies MovieJobPipelineCreateInput;

        await this.db.movie_Job_Pipeline.upsert({
            where: { movie_id },
            create: payload,
            update: payload,
        });
    }

    async setSummarizing(movie_id: string): Promise<void> {
        const updatedAt = new Date().toISOString();
        const payload = {
            movie_id,

            status: MOVIE_STATUS.SUMMARIZING,
            failed_step: null,
            failed_at: null,
            failed_reason: null,

            summarized_at: updatedAt,
            completed_at: null,
        } satisfies MovieJobPipelineCreateInput;

        await this.db.movie_Job_Pipeline.upsert({
            where: { movie_id },
            create: payload,
            update: payload,
        });
    }
    async setComplete(movie_id: string): Promise<void> {
        const updatedAt = new Date().toISOString();
        const payload = {
            movie_id,
            status: MOVIE_STATUS.COMPLETE,
            completed_at: updatedAt,
        } satisfies MovieJobPipelineCreateInput;
        await this.db.movie_Job_Pipeline.upsert({
            where: { movie_id },
            create: payload,
            update: payload,
        });
    }
    
    async setFailed(
        movie_id: string,
        failed_step: MovieStatusType,
        failed_reason: string,
    ): Promise<void> {
        const updatedAt = new Date().toISOString();
        const payload = {
            movie_id,
            status: MOVIE_STATUS.FAILED,
            failed_at: updatedAt,
            failed_reason,
            failed_step,
        } satisfies MovieJobPipelineCreateInput;
        await this.db.movie_Job_Pipeline.upsert({
            where: { movie_id },
            create: payload,
            update: payload,
        });
    }
}
