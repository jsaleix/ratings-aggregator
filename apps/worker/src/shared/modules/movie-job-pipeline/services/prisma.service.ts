import { PrismaClient } from "../../../../../generated/prisma";
import { db } from "../../../../core/db";
import { logger } from "../../../logger";
import { MOVIE_STATUS, type MovieStatusType } from "../constants";
import { MovieJobPipelineServiceI } from "../interfaces";
import { type MovieJobPipelineCreateInput } from "../types/db";

export class PrismaMovieJobPipelineService implements MovieJobPipelineServiceI {
    db: PrismaClient;

    constructor() {
        this.db = db;
    }

    async setFetching(tmdb_id: number): Promise<void> {
        try {
            const updatedAt = new Date().toISOString();
            const payload = {
                tmdb_id,

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
                where: { tmdb_id },
                create: payload,
                update: payload,
            });
        } catch (error) {
            logger.error("Movie worker failed", {
                tags: [
                    "PrismaMovieJobPipelineService",
                    "setFetching",
                    "worker",
                ],
                payload: { tmdb_id },
                error: error instanceof Error ? error.message : "",
            });
        }
    }

    async setRating(tmdb_id: number): Promise<void> {
        try {
            const updatedAt = new Date().toISOString();
            const payload = {
                tmdb_id,

                status: MOVIE_STATUS.RATING,
                failed_step: null,
                failed_at: null,
                failed_reason: null,

                rated_at: updatedAt,
                summarized_at: null,
                completed_at: null,
            } satisfies MovieJobPipelineCreateInput;

            await this.db.movie_Job_Pipeline.upsert({
                where: { tmdb_id },
                create: payload,
                update: payload,
            });
        } catch (error) {
            logger.error("Movie worker failed", {
                tags: ["PrismaMovieJobPipelineService", "setRating", "worker"],
                payload: { tmdb_id },
                error: error instanceof Error ? error.message : "",
            });
        }
    }

    async setSummarizing(tmdb_id: number): Promise<void> {
        try {
            const updatedAt = new Date().toISOString();
            const payload = {
                tmdb_id,

                status: MOVIE_STATUS.SUMMARIZING,
                failed_step: null,
                failed_at: null,
                failed_reason: null,

                summarized_at: updatedAt,
                completed_at: null,
            } satisfies MovieJobPipelineCreateInput;

            await this.db.movie_Job_Pipeline.upsert({
                where: { tmdb_id },
                create: payload,
                update: payload,
            });
        } catch (error) {
            logger.error("Movie worker failed", {
                tags: [
                    "PrismaMovieJobPipelineService",
                    "setSummarizing",
                    "worker",
                ],
                payload: { tmdb_id },
                error: error instanceof Error ? error.message : "",
            });
        }
    }
    async setComplete(tmdb_id: number): Promise<void> {
        try {
            const updatedAt = new Date().toISOString();
            const payload = {
                tmdb_id,
                status: MOVIE_STATUS.COMPLETE,
                completed_at: updatedAt,
            } satisfies MovieJobPipelineCreateInput;
            await this.db.movie_Job_Pipeline.upsert({
                where: { tmdb_id },
                create: payload,
                update: payload,
            });
        } catch (error) {
            logger.error("Movie worker failed", {
                tags: [
                    "PrismaMovieJobPipelineService",
                    "setComplete",
                    "worker",
                ],
                payload: { tmdb_id },
                error: error instanceof Error ? error.message : "",
            });
        }
    }

    async setFailed(
        tmdb_id: number,
        failed_step: MovieStatusType,
        failed_reason: string,
    ): Promise<void> {
        try {
            const updatedAt = new Date().toISOString();
            const payload = {
                tmdb_id,
                status: MOVIE_STATUS.FAILED,
                failed_at: updatedAt,
                failed_reason,
                failed_step,
            } satisfies MovieJobPipelineCreateInput;
            await this.db.movie_Job_Pipeline.upsert({
                where: { tmdb_id },
                create: payload,
                update: payload,
            });
        } catch (error) {
            logger.error("Movie worker failed", {
                tags: ["PrismaMovieJobPipelineService", "setFailed", "worker"],
                payload: { tmdb_id },
                error: error instanceof Error ? error.message : "",
            });
        }
    }
}
