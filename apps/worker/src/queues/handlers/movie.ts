import { Job, Queue } from "bullmq";
import { movieService, ratingService } from "..";
import { ratingWorker } from "../workers";
import { QUEUES, RedisMqConnection } from "../../config/bullmq";

const movieJobsTypeValues = {
    "add-movie:id": "add-movie:id",
    "add-movie:name": "add-movie:name",
    "add-movie-with-ratings:id": "add-movie-with-ratings:id",
    "add-movie-with-ratings:name": "add-movie-with-ratings:name",
} as const;

const movieJobsTypeArr = Object.values(movieJobsTypeValues);

type MovieJobType =
    (typeof movieJobsTypeValues)[keyof typeof movieJobsTypeValues];

type MovieJob = {
    type: MovieJobType;
    payload: {
        movieId?: number;
        name?: string;
    };
};

const ratingQueue = new Queue(QUEUES.rating, { connection: RedisMqConnection });

export const movieHandler = async (job: Job<MovieJob>) => {
    const { type, payload } = job.data;

    if (!movieJobsTypeArr.includes(type)) {
        throw new Error(`❌ Unknown job type: ${type}`);
    }

    console.log(`Processing job [${job.id}] of type "${type}"`);

    let res: any = null;

    switch (type) {
        case movieJobsTypeValues["add-movie:id"]:
            if (!payload.movieId)
                throw new Error(`Missing movieId from add-movie:id`);
            res = await movieService.addMovieById(payload.movieId);
            break;

        case movieJobsTypeValues["add-movie:name"]:
            if (!payload.name)
                throw new Error(`Missing name from add-movie:name`);
            res = await movieService.addMovieByName(payload.name);
            break;

        case movieJobsTypeValues["add-movie-with-ratings:id"]:
            if (!payload.movieId)
                throw new Error(
                    `Missing movieId from add-movie-with-ratings:id`
                );
            res = await movieService
                .addMovieById(payload.movieId)
                .then(async (movie) => {
                    await ratingQueue.addBulk([
                        {
                            name: `set-rating:rotten:${movie.id}`,
                            data: {
                                type: "set-rating:rotten",
                                payload: {
                                    movieId: movie.id,
                                    name: movie.title,
                                },
                            },
                        },
                        {
                            name: `set-rating:imdb:${movie.id}`,
                            data: {
                                type: "set-rating:imdb",
                                payload: { movieId: movie.id },
                            },
                        },
                        {
                            name: `set-rating:letterboxd:${movie.id}`,
                            data: {
                                type: "set-rating:letterboxd",
                                payload: { movieId: movie.id },
                            },
                        },
                    ]);
                });
            break;

        case movieJobsTypeValues["add-movie-with-ratings:name"]:
            if (!payload.name)
                throw new Error(
                    `Missing name from add-movie-with-ratings:name`
                );
            res = await movieService.addMovieByName(payload.name);
            break;
    }
};
