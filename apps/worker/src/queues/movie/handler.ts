import { Job } from "bullmq";

import { MovieType } from "../../features/movies/types/db";
import { AddMovieByTMDBIdUseCase } from "../../features/movies/use-cases/add-movie-by-tmdb-id";

export type MovieJob = {
    // type: MovieJobType;
    payload: {
        requestId: string;
        tmdbId: number;
    };
};

class MovieHandler {
    constructor(private addMovie: AddMovieByTMDBIdUseCase) {}

    async handle(job: Job<MovieJob>): Promise<MovieType> {
        const { tmdbId } = job.data.payload;

        const movie = await this.addMovie.execute(tmdbId);
        return movie;
    }
}

export default MovieHandler;
