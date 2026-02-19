-- RenameForeignKey
ALTER TABLE "Movie_Rating" RENAME CONSTRAINT "Movie_Rating_movieId_fkey" TO "Movie_Rating_movie_id_fkey";

-- RenameForeignKey
ALTER TABLE "Movie_Ratings_Summary" RENAME CONSTRAINT "Movie_Ratings_Summary_movieId_fkey" TO "Movie_Ratings_Summary_movie_id_fkey";

-- RenameForeignKey
ALTER TABLE "Movie_Request" RENAME CONSTRAINT "Movie_Request_userId_fkey" TO "Movie_Request_user_id_fkey";

-- RenameIndex
ALTER INDEX "Movie_tmdbId_key" RENAME TO "Movie_tmdb_id_key";

-- RenameIndex
ALTER INDEX "Movie_Ratings_Summary_movieId_key" RENAME TO "Movie_Ratings_Summary_movie_id_key";
