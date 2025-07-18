import { Job } from "bullmq";
import MovieService from "../../features/movies/services/movies.service";
import RatingService from "../../features/ratings/services/rating.service";
import { MovieRatingsStatus } from "../../config/movies";

const ratingJobsTypeValues = {
    "set-rating:rotten": "set-rating:rotten",
    "set-rating:imdb": "set-rating:imdb",
    "set-rating:letterboxd": "set-rating:letterboxd",
    "set-rating:allocine": "set-rating:allocine",
} as const;

const ratingJobsTypeArr = Object.values(ratingJobsTypeValues);

type RatingJobType =
    (typeof ratingJobsTypeValues)[keyof typeof ratingJobsTypeValues];

type RatingJob = {
    type: RatingJobType;
    payload: {
        movieId: string;
    };
};

class RatingHandler {
    constructor(
        private movieService: MovieService,
        private ratingService: RatingService
    ) {}

    async handle(job: Job<RatingJob>) {
        const { type, payload: _ } = job.data;

        if (!ratingJobsTypeArr.includes(type)) {
            throw new Error(`❌ Unknown job type: ${type}`);
        }

        const { movieId } = job.data.payload;

        const movie = await this.movieService.getMovieById(movieId);
        if (!movie) {
            throw new Error(`Movie with ID ${movieId} not found`);
        }

        console.log(`Processing job [${job.id}] of type "${type}"`);

        let res: any = undefined;

        switch (type) {
            case ratingJobsTypeValues["set-rating:allocine"]:
                break;
            case ratingJobsTypeValues["set-rating:imdb"]:
                break;
            case ratingJobsTypeValues["set-rating:letterboxd"]:
                break;
            case ratingJobsTypeValues["set-rating:rotten"]:
                res = await this.ratingService.setRottenRatings(
                    movieId,
                    movie.title
                );
                break;
        }

        // I put it here because the queue.on('completed') does not exist apparently
        if (movie.ratings_status === MovieRatingsStatus.pending) {
            await this.movieService.updateMovieRatingsStatus(
                movieId,
                MovieRatingsStatus.completed
            );
        }
        return res;
    }
}

export default RatingHandler;
