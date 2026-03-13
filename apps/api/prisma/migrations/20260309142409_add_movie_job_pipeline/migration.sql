-- CreateEnum
CREATE TYPE "MovieStatus" AS ENUM ('FETCHING', 'RATING', 'SUMMARIZING', 'COMPLETE', 'FAILED');

-- CreateTable
CREATE TABLE "Movie_Job_Pipeline" (
    "id" TEXT NOT NULL,
    "movie_id" TEXT NOT NULL,
    "status" "MovieStatus" NOT NULL DEFAULT 'FETCHING',
    "failed_step" "MovieStatus",
    "failed_reason" TEXT,
    "failed_at" TIMESTAMP(3),
    "fetched_at" TIMESTAMP(3),
    "rated_at" TIMESTAMP(3),
    "summarized_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "Movie_Job_Pipeline_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_Job_Pipeline_movie_id_key" ON "Movie_Job_Pipeline"("movie_id");

-- AddForeignKey
ALTER TABLE "Movie_Job_Pipeline" ADD CONSTRAINT "Movie_Job_Pipeline_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
