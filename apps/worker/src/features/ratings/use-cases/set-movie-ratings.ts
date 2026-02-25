import { MovieRepositoryI } from "../../movies/interfaces/repositories";
import { RatingRepositoryI } from "../interfaces/repositories";
import { RatingCollectorServiceI } from "../interfaces/services";

export class SetMovieRatings {
    constructor(
        private movieRepository: MovieRepositoryI,
        private ratingCollector: RatingCollectorServiceI,
        private ratingRepository: RatingRepositoryI,
    ) {}

    async execute(movieId: string) {
        const movie = await this.movieRepository.getMovieBy({ id: movieId });
        if (!movie) {
            throw new Error(`Movie with ID ${movieId} not found`);
        }
        const rawResults = await Promise.allSettled([
            this.ratingCollector.collectAllocine(movie),
            this.ratingCollector.collectIMDB(movie),
            this.ratingCollector.collectRotten(movie),
            this.ratingCollector.collectLetterboxd(movie),
        ]);

        const ratings = rawResults
            .filter((result) => result.status === "fulfilled")
            .map((result) => result.value)
            .flat();

        const results = this.ratingRepository.setAllForMovie(movieId, ratings);

        return results;
    }
}
