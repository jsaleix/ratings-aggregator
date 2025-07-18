import { PrismaClient } from "../../../../generated/prisma";
import { MovieRatingsStatusType } from "../../../config/movies";
import { MovieType } from "../types/db";
import TMDBService from "./tmdb.service";

class MovieService {
    tmdbService: TMDBService;
    db: PrismaClient;

    constructor(db: PrismaClient, imdbService: TMDBService) {
        this.tmdbService = imdbService;
        this.db = db;
    }

    async addMovieByTMDBId(tmdbId: number): Promise<MovieType> {
        const movieExists = await this.getMovieByTMDBId(tmdbId);
        if (movieExists) return movieExists;
        const movieResponse = await this.tmdbService.getMovieById(tmdbId);
        const movieData = this.tmdbService.mapApiResponseToModel(movieResponse);
        const createdMovie = await this.db.movie.create({
            data: movieData,
        });

        return createdMovie;
    }

    async updateMovieRatingsStatus(
        movieId: string,
        ratingsStatus: MovieRatingsStatusType
    ) {
        const updatedMovie = await this.db.movie.update({
            where: { id: movieId },
            data: { ratings_status: ratingsStatus },
        });

        return updatedMovie;
    }

    // Useless actually
    async addMovieByName(movieName: string): Promise<MovieType> {
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

    async getMovieById(movieId: string): Promise<MovieType | null> {
        const movie = await this.db.movie.findUnique({
            where: {
                id: movieId,
            },
        });

        return movie ? movie : null;
    }

    async getMovieByTMDBId(tmdbId: number): Promise<MovieType | null> {
        const movie = await this.db.movie.findFirst({
            where: {
                tmdbId: +tmdbId,
            },
        });

        return movie ? movie : null;
    }
}

export default MovieService;
