import { Job, Queue } from "bullmq";
import MovieService from "../../features/movies/services/movies.service";
import { MovieType } from "../../features/movies/types/db";

const movieJobsTypeValues = {
    addMovieByTMDBId: "add-movie:tmdbId",
    addMovieWithRatingsByTMDBId: "add-movie-with-ratings:tmdbId",
} as const;

const movieJobsTypeArr = Object.values(movieJobsTypeValues);

type MovieJobType =
    (typeof movieJobsTypeValues)[keyof typeof movieJobsTypeValues];

type MovieJob = {
    type: MovieJobType;
    payload: {
        tmdbId: number;
    };
};

class MovieHandler {
    constructor(
        private ratingQueue: Queue,
        private movieService: MovieService
    ) {}

    async handle(job: Job<MovieJob>) {
        const { type, payload } = job.data;

        if (!movieJobsTypeArr.includes(type)) {
            throw new Error(`❌ Unknown job type: ${type}`);
        }

        console.log(`Processing job [${job.id}] of type "${type}"`);

        let res: any = null;

        switch (type) {
            case movieJobsTypeValues.addMovieByTMDBId:
                res = await this.movieService.addMovieByTMDBId(payload.tmdbId);
                job.updateProgress(100);
                break;

            case movieJobsTypeValues.addMovieWithRatingsByTMDBId:
                const movie = await this.movieService.addMovieByTMDBId(
                    payload.tmdbId
                );
                job.updateProgress(50);

                await this.gatherRatings(movie);
                job.updateProgress(100);
                break;
        }
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
