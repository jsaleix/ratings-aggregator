import { Worker } from "bullmq";

import { QUEUES, RedisMqConnection } from "../../config/bullmq";
import { db } from "../../core/db";

import MovieService from "../../features/movies/services/movies.service";
import RatingService from "../../features/ratings/services/rating.service";
import { SetMovieRatings } from "../../features/ratings/use-cases/set-movie-ratings";
import { RatingCollectorService } from "../../features/ratings/services/rating-collector.service";

import { summaryQueue } from "..";
import RatingHandler from "./handler";

const movieService = new MovieService(db);
const ratingService = new RatingService(db);
const ratingCollector = new RatingCollectorService(ratingService);

const setMovieRatingsUseCase = new SetMovieRatings(
    movieService,
    ratingCollector
);

const ratingHandler = new RatingHandler(setMovieRatingsUseCase);

export const ratingWorker = new Worker(
    QUEUES.rating,
    ratingHandler.handle.bind(ratingHandler),
    {
        connection: RedisMqConnection,
        concurrency: 1,
        autorun: false,
        limiter: {
            // Add a delay of 1 minute between jobs
            max: 1,
            duration: 1 * 60 * 1000,
        },
    }
);

ratingWorker.on("active", (job) => {
    console.log("---------------");
    console.log("RATING WORKER ACTIVE");
    const { id } = job.data.payload;
    console.log("Movie Id:", id);
    console.log("---------------");
});

ratingWorker.on("completed", (job) => {
    console.log("---------------");
    const { id } = job.data.payload;
    console.log("RATING WORKER COMPLETED");
    if (!id) {
        console.log("No id from payload");
    } else {
        movieService.updateMovie(id, {
            updated_at: new Date().toISOString(),
        });
        summaryQueue.add("generate-summary", {
            payload: { id },
            type: "movie",
            removeOnComplete: true,
            removeOnFail: true,
        });
    }
    console.log("---------------");
});

ratingWorker.on("failed", (job, error) => {
    console.log("---------------");
    console.log("RATING WORKER FAILED");
    console.log(`MovieID ${job?.data.payload.id}`);
    console.log(error.message);
    console.log("---------------");
});
