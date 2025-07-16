import { PrismaClient } from "../../../../generated/prisma";
import TMDBService from "./tmdb.service";

class MovieService {
    tmdbService: TMDBService;
    db: PrismaClient;

    constructor(db: PrismaClient, imdbService: TMDBService) {
        this.tmdbService = imdbService;
        this.db = db;
    }

    async addMovieById(movieId: number) {
        const movieExists = await this.db.movie.findFirst({
            where: {
                tmdbId: movieId,
            },
        });
        if (movieExists) return movieExists;
        const movieResponse = await this.tmdbService.getMovie(movieId);
        const movieData = this.tmdbService.mapApiResponseToModel(movieResponse);
        const createdMovie = await this.db.movie.create({
            data: movieData,
        });

        return createdMovie;
    }

    async addMovieByName(movieName: string) {
        console.log(`🟦 Adding movie ${movieName}`);
        const movieResponse = await this.tmdbService.findMovie(movieName);
        if (!movieResponse || movieResponse.length === 0) {
            throw new Error(`🟥 Movie ${movieName} not found`);
        }
        const movieData = this.tmdbService.mapApiResponseToModel(
            movieResponse[0]
        );
        const createdMovie = await this.db.movie.create({
            data: movieData,
        });

        return createdMovie;
    }

    async getMovieById(movieId: string) {
        const movie = await this.db.movie.findUnique({
            where: {
                id: movieId,
            },
        });

        if (!movie) {
            throw new Error(`Movie with ID ${movieId} not found`);
        }

        return movie;
    }
}

export default MovieService;
