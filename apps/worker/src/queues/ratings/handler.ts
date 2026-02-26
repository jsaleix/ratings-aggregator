import { Job } from "bullmq";
import { MovieRatingType } from "../../features/ratings/types/db";
import { SetMovieRatings } from "../../features/ratings/use-cases/set-movie-ratings";

type RatingJob = {
    type: "movie" | "series";
    payload: {
        id: string;
    };
};

class RatingHandler {
    constructor(private setMovieRatings: SetMovieRatings) {}

    async handle(job: Job<RatingJob>): Promise<Array<MovieRatingType>> {
        const {
            type,
            payload: { id },
        } = job.data;
        if (!id) throw new Error("Missing id");
        switch (type) {
            case "movie":
                return await this.setMovieRatings.execute(id);
            default:
                throw new Error("Unknown type");
        }
    }
}

export default RatingHandler;
