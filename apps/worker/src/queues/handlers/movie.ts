import { Job } from "bullmq";
import MovieService from "../../features/movies/services/movies.service";
import { MovieType } from "../../features/movies/types/db";

// const movieJobsTypeValues = {
//     addMovieByTMDBId: "add-movie:tmdbId",
//     addMovieWithRatingsByTMDBId: "add-movie-with-ratings:tmdbId",
// } as const;

// // const movieJobsTypeArr = Object.values(movieJobsTypeValues);

// // type MovieJobType =
// //     (typeof movieJobsTypeValues)[keyof typeof movieJobsTypeValues];

export type MovieJob = {
    // type: MovieJobType;
    payload: {
        requestId: string;
        tmdbId: number;
    };
};

class MovieHandler {
    constructor(private movieService: MovieService) {}

    async handle(job: Job<MovieJob>): Promise<MovieType> {
        const { tmdbId } = job.data.payload;

        const movie = await this.movieService.addMovieByTMDBId(tmdbId);
        return movie;
    }
}

export default MovieHandler;
