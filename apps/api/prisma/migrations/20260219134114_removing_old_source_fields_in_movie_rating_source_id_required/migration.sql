/*
  Warnings:

  - You are about to drop the column `rating_source` on the `Movie_Rating` table. All the data in the column will be lost.
  - You are about to drop the column `rating_unit` on the `Movie_Rating` table. All the data in the column will be lost.
  - Made the column `rating_source_id` on table `Movie_Rating` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Movie_Rating" DROP CONSTRAINT "Movie_Rating_rating_source_id_fkey";

-- AlterTable
ALTER TABLE "Movie_Rating" DROP COLUMN "rating_source",
DROP COLUMN "rating_unit",
ALTER COLUMN "rating_source_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Movie_Rating" ADD CONSTRAINT "Movie_Rating_rating_source_id_fkey" FOREIGN KEY ("rating_source_id") REFERENCES "Rating_Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
