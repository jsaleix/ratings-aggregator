/*
  Warnings:

  - A unique constraint covering the columns `[movieId]` on the table `Movie_Ratings_Summary` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Movie_Ratings_Summary_movieId_key" ON "public"."Movie_Ratings_Summary"("movieId");
