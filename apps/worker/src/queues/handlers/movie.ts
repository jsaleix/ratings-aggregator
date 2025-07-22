import { Job, Queue } from "bullmq";
import MovieService from "../../features/movies/services/movies.service";
import { MovieType } from "../../features/movies/types/db";
import { sleep } from "../../shared/utils";

const movieJobsTypeValues = {
    addMovieByTMDBId: "add-movie:tmdbId",
    addMovieWithRatingsByTMDBId: "add-movie-with-ratings:tmdbId",
} as const;

const movieJobsTypeArr = Object.values(movieJobsTypeValues);

type MovieJobType =
    (typeof movieJobsTypeValues)[keyof typeof movieJobsTypeValues];

export type MovieJob = {
    type: MovieJobType;
    payload: {
        tmdbId: number;
    };
};

class MovieHandler {
    delay = 30000;

    constructor(
        private ratingQueue: Queue,
        private movieService: MovieService
    ) {}

    setDelay(value: number) {
        this.delay = value;
    }

    async handle(job: Job<MovieJob>) {
        await sleep(this.delay);
        const { type, payload } = job.data;

        if (!movieJobsTypeArr.includes(type)) {
            throw new Error(`❌ Unknown job type: ${type}`);
        }

        console.log(`Processing job [${job.id}] of type "${type}"`);
        switch (type) {
            case movieJobsTypeValues.addMovieByTMDBId:
                return await this.movieService.addMovieByTMDBId(payload.tmdbId);
                break;

            case movieJobsTypeValues.addMovieWithRatingsByTMDBId:
                return await this.movieService.addMovieByTMDBId(payload.tmdbId);
                break;
        }

        return undefined;
    }

    async gatherRatings(movie: MovieType) {
        await this.ratingQueue.addBulk([
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
    }
}

export default MovieHandler;
