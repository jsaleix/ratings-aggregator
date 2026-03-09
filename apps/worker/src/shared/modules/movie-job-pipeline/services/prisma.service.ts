import { PrismaClient } from "../../../../../generated/prisma";
import { db } from "../../../../core/db";
import { MOVIE_STATUS, type MovieStatusType } from "../constants";
import { MovieJobPipelineServiceI } from "../interfaces";

export class PrismaMovieJobPipelineService implements MovieJobPipelineServiceI {
    db: PrismaClient;

    constructor() {
        this.db = db;
    }

    async setFetching(movie_id: string): Promise<void> {
        const updatedAt = new Date().toISOString();
        await this.db.movie_Job_Pipeline.upsert({
            where: { movie_id },
            create: {
                movie_id,
                status: MOVIE_STATUS.FETCHING,
                fetched_at: updatedAt,
            },
            update: {
                movie_id,
                status: MOVIE_STATUS.FETCHING,
                fetched_at: updatedAt,
            },
        });
    }

    async setRating(movie_id: string): Promise<void> {
        const updatedAt = new Date().toISOString();
        await this.db.movie_Job_Pipeline.upsert({
            where: { movie_id },
            create: {
                movie_id,
                status: MOVIE_STATUS.RATING,
                rated_at: updatedAt,
            },
            update: {
                movie_id,
                status: MOVIE_STATUS.RATING,
                rated_at: updatedAt,
            },
        });
    }

    async setSummarizing(movie_id: string): Promise<void> {
        const updatedAt = new Date().toISOString();
        await this.db.movie_Job_Pipeline.upsert({
            where: { movie_id },
            create: {
                movie_id,
                status: MOVIE_STATUS.RATING,
                rated_at: updatedAt,
            },
            update: {
                movie_id,
                status: MOVIE_STATUS.RATING,
                rated_at: updatedAt,
            },
        });
    }
    async setComplete(movie_id: string): Promise<void> {
        const updatedAt = new Date().toISOString();
        await this.db.movie_Job_Pipeline.upsert({
            where: { movie_id },
            create: {
                movie_id,
                status: MOVIE_STATUS.COMPLETE,
                completed_at: updatedAt,
            },
            update: {
                movie_id,
                status: MOVIE_STATUS.COMPLETE,
                completed_at: updatedAt,
            },
        });
    }
    async setFailed(
        movie_id: string,
        failed_step: MovieStatusType,
        failed_reason: string,
    ): Promise<void> {
        const updatedAt = new Date().toISOString();
        await this.db.movie_Job_Pipeline.upsert({
            where: { movie_id },
            create: {
                movie_id,
                status: MOVIE_STATUS.FAILED,
                failed_at: updatedAt,
                failed_reason,
                failed_step,
            },
            update: {
                movie_id,
                status: MOVIE_STATUS.FAILED,
                failed_at: updatedAt,
                failed_reason,
                failed_step,
            },
        });
    }
}
