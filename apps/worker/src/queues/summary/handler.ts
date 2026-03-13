import { Job } from "bullmq";

import { GenerateMovieSummaryUseCase } from "../../features/summary/use-cases/generate-summary";

export type SummaryJob = {
    type: "movie" | "series";
    payload: {
        movie_id: string;
        movie_slug: string;
        tmdb_id: number;
    };
};

class SummaryHandler {
    constructor(
        private generateMovieSummaryUseCase: GenerateMovieSummaryUseCase,
    ) {}

    async handle(job: Job<SummaryJob>) {
        const {
            type,
            payload: { movie_id },
        } = job.data;
        if (!movie_id) throw new Error("Missing id");
        switch (type) {
            case "movie":
                return await this.generateMovieSummaryUseCase.execute(movie_id);
            case "series":
                throw new Error(
                    "Generating series ratings summary is not implemented yet",
                );
            default:
                throw new Error(`Unhandled job type: ${type}`);
        }
    }
}

export default SummaryHandler;
