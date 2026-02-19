import slugify from "slugify";
import { MovieRepositoryI } from "../interfaces/repositories";
import TMDBService from "../services/tmdb.service";

export class AddMovieByTMDBIdUseCase {
    constructor(
        private tmdbService: TMDBService,
        private movieRepository: MovieRepositoryI,
    ) {}

    async execute(tmdbId: number) {
        const movieResponse = await this.tmdbService.getMovieById(tmdbId);
        if (movieResponse.adult) {
            throw new Error(
                "Movie is marked as adult content and cannot be added.",
            );
        }
        const movieData = this.tmdbService.mapApiResponseToModel(movieResponse);
        const slug = slugify(`${movieData.title}-${movieData.year}`, {
            lower: true,
            strict: true,
            locale: "fr",
        });
        const createdMovie = await this.movieRepository.createOrUpdate({
            ...movieData,
            slug,
        });

        return createdMovie;
    }
}
