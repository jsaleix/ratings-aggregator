/*
  Warnings:

  - You are about to drop the column `score` on the `Movie_Ratings_Summary` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Movie_Request` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie_Ratings_Summary" DROP COLUMN "score";

-- AlterTable
ALTER TABLE "Movie_Request" DROP COLUMN "title";
