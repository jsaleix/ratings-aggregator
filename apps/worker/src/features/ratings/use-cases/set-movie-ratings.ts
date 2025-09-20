import MovieService from "../../movies/services/movies.service";
import { RatingCollectorService } from "../services/rating-collector.service";

export class SetMovieRatings {
    constructor(
        private movieService: MovieService,
        private ratingCollector: RatingCollectorService
    ) {}

    async execute(movieId: string) {
        const movie = await this.movieService.getMovieBy({ id: movieId });
        if (!movie) {
            throw new Error(`Movie with ID ${movieId} not found`);
        }
        const rawResults = await Promise.allSettled([
            this.ratingCollector.collectAllocine(movie),
            this.ratingCollector.collectIMDB(movie),
            this.ratingCollector.collectRotten(movie),
            this.ratingCollector.collectLetterboxd(movie),
        ]);

        const results = rawResults
            .filter((result) => result.status === "fulfilled")
            .map((result) => result.value)
            .flat();

        return results;
    }
}
