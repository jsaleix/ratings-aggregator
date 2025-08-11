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
    }
);

ratingWorker.on("completed", (job) => {
    const { id: movieId } = job.data.payload;
    console.log("RATING WORKER COMPLETED");
    if (!movieId) return;
    summaryQueue.add("generate-summary", {
        payload: { id: movieId },
        type: "movie",
    });
});

ratingWorker.on("failed", (job, error) => {
    console.log("---------------");
    console.log("RATING WORKER FAILED");
    console.log(`MovieID ${job?.data.payload.id}`);
    console.log(error.message);
    console.log("---------------");
});
