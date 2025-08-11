import { Job } from "bullmq";

import { GenerateMovieSummaryUseCase } from "../../features/summary/use-cases/generate-summary";

export type SummaryJob = {
    type: "movie" | "series";
    payload: {
        id: string;
    };
};

class SummaryHandler {
    constructor(
        private generateMovieSummaryUseCase: GenerateMovieSummaryUseCase
    ) {}

    async handle(job: Job<SummaryJob>) {
        const {
            type,
            payload: { id },
        } = job.data;
        if (!id) throw new Error("Missing id");
        switch (type) {
            case "movie":
                return await this.generateMovieSummaryUseCase.execute(id);
                break;
            case "series":
                throw new Error(
                    "Generating series ratings summary is not implemented yet"
                );
            default:
                throw new Error(`Unhandled job type: ${type}`);
        }
    }
}

export default SummaryHandler;
