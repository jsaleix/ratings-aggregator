import slugify from "slugify";
import { GenreRepositoryI, MovieRepositoryI } from "../interfaces/repositories";
import TMDBService from "../services/tmdb.service";

export class AddMovieByTMDBIdUseCase {
    constructor(
        private tmdbService: TMDBService,
        private movieRepository: MovieRepositoryI,
        private genreRepository: GenreRepositoryI,
    ) {}

    async execute(tmdbId: number) {
        const movieResponse = await this.tmdbService.getMovieById(tmdbId);
        if (movieResponse.adult) {
            throw new Error(
                "Movie is marked as adult content and cannot be added.",
            );
        }
        const movieData = this.tmdbService.mapApiResponseToModel(movieResponse);
        const rawGenres = this.tmdbService.mapApiGenreResponseToModel(
            movieResponse.genres,
        );
        const slug = slugify(`${movieData.title}-${movieData.year}`, {
            lower: true,
            strict: true,
            locale: "fr",
        });

        const genres = rawGenres.map((genre) =>
            this.genreRepository.createOrUpdateGenre(genre),
        );
        const savedGenres = await Promise.all(genres);
        const createdMovie = await this.movieRepository.createOrUpdate(
            {
                ...movieData,
                slug,
            },
            savedGenres,
        );

        return createdMovie;
    }
}
