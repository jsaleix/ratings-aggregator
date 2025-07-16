import { Queue } from "bullmq";
import { db } from "../core/db";
import MovieService from "../features/movies/services/movies.service";
import TMDBService from "../features/movies/services/tmdb.service";
import RatingService from "../features/ratings/services/rating.service";
import { QUEUES, RedisMqConnection } from "../config/bullmq";

export const ratingQueue = new Queue(QUEUES.rating, {
    connection: RedisMqConnection,
});

export const tmdbService = new TMDBService();
export const movieService = new MovieService(db, tmdbService);
export const ratingService = new RatingService(db);
