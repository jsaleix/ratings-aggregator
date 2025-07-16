import { db } from "../core/db";
import MovieService from "../features/movies/services/movies.service";
import TMDBService from "../features/movies/services/tmdb.service";
import RatingService from "../features/ratings/services/rating.service";

export const tmdbService = new TMDBService();
export const movieService = new MovieService(db, tmdbService);
export const ratingService = new RatingService(db);
