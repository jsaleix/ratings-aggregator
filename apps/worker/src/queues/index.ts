import { Job, Queue, Worker } from "bullmq";

import { QUEUES, RedisMqConnection } from "../config/bullmq";
// import { db } from "../core/db";

// import MovieService from "../features/movies/services/movies.service";
// import TMDBService from "../features/movies/services/tmdb.service";
// import RatingService from "../features/ratings/services/rating.service";
// import MovieRequestService from "../features/requests/services/request";
// import { MovieType } from "../features/movies/types/db";
// import { RatingType } from "../features/ratings/types/db";

// import MovieHandler, { MovieJob } from "./movie/handler";
// import RatingHandler from "./handlers/rating";
// import AIService from "../features/summary/services/ai.service";
// import { DBService as SummaryDBService } from "../features/summary/services/db.service";
// import { GenerateMovieSummaryUseCase } from "../features/summary/use-cases/generate-summary";
// import SummaryHandler from "./summary/handler";

export const ratingQueue = new Queue(QUEUES.rating, {
    connection: RedisMqConnection,
    defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
    },
});

export const summaryQueue = new Queue(QUEUES.summary, {
    connection: RedisMqConnection,
    defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
    },
});

// const aiService = new AIService();
// const summaryDbService = new SummaryDBService(db);
// const generateMovieSummaryUseCase = new GenerateMovieSummaryUseCase(
//     aiService,
//     summaryDbService
// );

// const tmdbService = new TMDBService();
// const movieService = new MovieService(db, tmdbService);
// const ratingService = new RatingService(db);
// const movieRatingService = new MovieRequestService(db);

// const movieHandler = new MovieHandler(movieService);
// const ratingHandler = new RatingHandler(movieService, ratingService);
// const summaryHandler = new SummaryHandler(generateMovieSummaryUseCase);

// export const movieWorker = new Worker(
//     QUEUES.movie,
//     movieHandler.handle.bind(movieHandler),
//     {
//         connection: RedisMqConnection,
//         concurrency: 1,
//         autorun: false,
//     }
// );

// export const ratingWorker = new Worker(
//     QUEUES.rating,
//     ratingHandler.handle.bind(ratingHandler),
//     {
//         connection: RedisMqConnection,
//         concurrency: 1,
//         autorun: false,
//     }
// );

// export const summaryWorker = new Worker(
//     QUEUES.summary,
//     summaryHandler.handle.bind(summaryHandler),
//     {
//         connection: RedisMqConnection,
//         concurrency: 1,
//         autorun: false,
//     }
// );

// // HOOKS

// // Movies

// movieWorker.on("active", async (job: Job<MovieJob>) => {
//     console.log("---------------");
//     console.log("MOVIE WORKER ACTIVE");
//     const { requestId } = job.data.payload;
//     console.log("Active: ", requestId);
//     await movieRatingService.updateRequestState(requestId, true);
//     console.log("---------------");
// });

// movieWorker.on(
//     "completed",
//     async (_: Job<MovieJob>, movie: MovieType | undefined) => {
//         if (movie == undefined) return;
//         // await movieHandler.gatherRatings(movie);
//         console.log("GIVING ", movie.id);
//         await ratingQueue.add("set-ratings", {
//             payload: { movieId: movie.id },
//         });
//     }
// );

// movieWorker.on("failed", (job, error) => {
//     console.log("---------------");
//     console.log("MOVIE WORKER FAILED");
//     console.log(
//         `Request ${job?.data.payload.requestId} | TMDBID ${job?.data.payload.tmdbId}`
//     );
//     console.log(error.message);
//     console.log("---------------");
// });

// // Ratings

// ratingWorker.on("completed", (_, ratings: Array<RatingType> | undefined) => {
//     console.log("RATING WORKER COMPLETED");
//     if (!ratings) return;
//     summaryQueue.add("generate-summary", {
//         ratings,
//     });
// });

// ratingWorker.on("failed", (job, error) => {
//     console.log("---------------");
//     console.log("RATING WORKER FAILED");
//     console.log(`MovieID ${job?.data.payload.movieId}`);
//     console.log(error.message);
//     console.log("---------------");
// });
