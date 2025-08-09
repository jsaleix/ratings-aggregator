import { Job } from "bullmq";
import MovieService from "../../features/movies/services/movies.service";
import RatingService from "../../features/ratings/services/rating.service";
import { RatingType } from "../../features/ratings/types/db";

// const ratingJobsTypeValues = {
//     "set-rating:rotten": "set-rating:rotten",
//     "set-rating:imdb": "set-rating:imdb",
//     "set-rating:letterboxd": "set-rating:letterboxd",
//     "set-rating:allocine": "set-rating:allocine",
// } as const;

// const ratingJobsTypeArr = Object.values(ratingJobsTypeValues);

// type RatingJobType =
//     (typeof ratingJobsTypeValues)[keyof typeof ratingJobsTypeValues];

type RatingJob = {
    // type: RatingJobType;
    payload: {
        movieId: string;
    };
};

class RatingHandler {
    constructor(
        private movieService: MovieService,
        private ratingService: RatingService
    ) {}

    async handle(job: Job<RatingJob>): Promise<Array<RatingType>> {
        const { movieId } = job.data.payload;
        const movie = await this.movieService.getMovieById(movieId);
        if (!movie) {
            throw new Error(`Movie with ID ${movieId} not found`);
        }

        const rawResults = await Promise.allSettled([
            this.ratingService.setAllocineRatings(movie),
            this.ratingService.setIMDBRating(movie),
            this.ratingService.setRottenRatings(movie),
        ]);

        const results = rawResults
            .filter((result) => result.status === "fulfilled")
            .map((result) => result.value)
            .flat();
        return results;
    }
}

export default RatingHandler;
