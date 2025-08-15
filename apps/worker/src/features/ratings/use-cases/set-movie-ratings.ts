import MovieService from "../../movies/services/movies.service";
import { RatingCollectorService } from "../services/rating-collector.service";

export class SetMovieRatings {
    constructor(
        private movieService: MovieService,
        private ratingCollector: RatingCollectorService
    ) {}

    async execute(movieId: string) {
        const movie = await this.movieService.getMovieBy({ id: movieId });
        console.log("bfore getMovieBy id")
        if (!movie) {
            throw new Error(`Movie with ID ${movieId} not found`);
        }
        console.log("SETMOVIESRATINGS HERE")
        const rawResults = await Promise.allSettled([
            this.ratingCollector.collectAllocine(movie),
            this.ratingCollector.collectIMDB(movie),
            this.ratingCollector.collectRotten(movie),
        ]);

        const results = rawResults
            .filter((result) => result.status === "fulfilled")
            .map((result) => result.value)
            .flat();

        console.log(
            "results",
            results.map((r) => r.value)
        );
        return results;
    }
}
