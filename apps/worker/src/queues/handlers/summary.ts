import { Job } from "bullmq";

import { RatingType } from "../../features/ratings/types/db";

type SummaryJob = {
    payload: {
        ratings: Array<RatingType>;
    };
};

class SummaryHandler {
    constructor() {}

    async handle(job: Job<SummaryJob>) {
        // const { ratings } = job.data.payload;
        throw new Error("SummaryHandler is not implemented yet");
    }
}

export default SummaryHandler;
