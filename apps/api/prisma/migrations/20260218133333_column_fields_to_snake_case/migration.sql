BEGIN;

ALTER TABLE "Movie"
RENAME COLUMN "tmdbId" TO "tmdb_id";
ALTER TABLE "Movie"
RENAME COLUMN "tagLine" TO "tag_line";
ALTER TABLE "Movie"
RENAME COLUMN "imdbId" TO "imdb_id";

ALTER TABLE "Movie_Ratings_Summary"
RENAME COLUMN "movieId" TO "movie_id";

ALTER TABLE "Movie_Rating"
RENAME COLUMN "movieId" TO "movie_id";
ALTER TABLE "Movie_Rating"
RENAME COLUMN "sourceUrl" TO "source_url";

ALTER TABLE "Movie_Request"
RENAME COLUMN "tmdbId" TO "tmdb_id";

ALTER TABLE "Movie_Request"
RENAME COLUMN "userId" TO "user_id";

COMMIT;
