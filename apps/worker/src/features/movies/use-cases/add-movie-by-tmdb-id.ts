import MovieService from "../services/movies.service";
import TMDBService from "../services/tmdb.service";

export class AddMovieByTMDBIdUseCase {
    constructor(
        private tmdbService: TMDBService,
        private movieService: MovieService
    ) {}

    async execute(tmdbId: number) {
        const movieExists = await this.movieService.getMovieBy({
            tmdbId,
        });
        if (movieExists) return movieExists;
        const movieResponse = await this.tmdbService.getMovieById(tmdbId);
        if (movieResponse.adult) {
            throw new Error(
                "Movie is marked as adult content and cannot be added."
            );
        }
        const movieData = this.tmdbService.mapApiResponseToModel(movieResponse);
        const createdMovie = await this.movieService.createMovie(movieData);

        return createdMovie;
    }
}
