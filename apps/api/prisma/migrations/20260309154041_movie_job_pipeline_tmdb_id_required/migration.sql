/*
  Warnings:

  - You are about to drop the column `movie_id` on the `Movie_Job_Pipeline` table. All the data in the column will be lost.
  - Made the column `tmdb_id` on table `Movie_Job_Pipeline` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Movie_Job_Pipeline" DROP CONSTRAINT "Movie_Job_Pipeline_tmdb_id_fkey";

-- AlterTable
ALTER TABLE "Movie_Job_Pipeline" DROP COLUMN "movie_id",
ALTER COLUMN "tmdb_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Movie_Job_Pipeline" ADD CONSTRAINT "Movie_Job_Pipeline_tmdb_id_fkey" FOREIGN KEY ("tmdb_id") REFERENCES "Movie"("tmdb_id") ON DELETE RESTRICT ON UPDATE CASCADE;
