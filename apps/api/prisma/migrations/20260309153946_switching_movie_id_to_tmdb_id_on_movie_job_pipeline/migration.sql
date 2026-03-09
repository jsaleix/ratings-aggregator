/*
  Warnings:

  - A unique constraint covering the columns `[tmdb_id]` on the table `Movie_Job_Pipeline` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Movie_Job_Pipeline" DROP CONSTRAINT "Movie_Job_Pipeline_movie_id_fkey";

-- DropIndex
DROP INDEX "Movie_Job_Pipeline_movie_id_key";

-- AlterTable
ALTER TABLE "Movie_Job_Pipeline" ADD COLUMN     "tmdb_id" INTEGER,
ALTER COLUMN "movie_id" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Movie_Job_Pipeline_tmdb_id_key" ON "Movie_Job_Pipeline"("tmdb_id");

-- AddForeignKey
ALTER TABLE "Movie_Job_Pipeline" ADD CONSTRAINT "Movie_Job_Pipeline_tmdb_id_fkey" FOREIGN KEY ("tmdb_id") REFERENCES "Movie"("tmdb_id") ON DELETE SET NULL ON UPDATE CASCADE;
