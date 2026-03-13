import { Job } from "bullmq";
import { MovieRatingType } from "../../features/ratings/types/db";
import { SetMovieRatings } from "../../features/ratings/use-cases/set-movie-ratings";

export type RatingJob = {
    type: "movie" | "series";
    payload: {
        movie_id: string;
        movie_slug: string;
        tmdb_id: number;
    };
};

class RatingHandler {
    constructor(private setMovieRatings: SetMovieRatings) {}

    async handle(job: Job<RatingJob>): Promise<Array<MovieRatingType>> {
        const {
            type,
            payload: { movie_id },
        } = job.data;
        if (!movie_id) throw new Error("Missing id");
        switch (type) {
            case "movie":
                return await this.setMovieRatings.execute(movie_id);
            default:
                throw new Error("Unknown type");
        }
    }
}

export default RatingHandler;
