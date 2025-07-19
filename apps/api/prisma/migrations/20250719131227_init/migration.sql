-- CreateEnum
CREATE TYPE "RatingUnit" AS ENUM ('points', 'stars', 'percentage');

-- CreateEnum
CREATE TYPE "RatingsStatus" AS ENUM ('pending', 'completed', 'failed');

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tmdbId" INTEGER NOT NULL,
    "tagLine" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "runtime" INTEGER NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,
    "year" INTEGER NOT NULL,
    "budget" DOUBLE PRECISION NOT NULL,
    "poster_path" TEXT NOT NULL,
    "ratings_status" "RatingsStatus" NOT NULL DEFAULT 'pending',

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie_Rating" (
    "id" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "rating_source" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "rating_unit" "RatingUnit" NOT NULL,
    "extra" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movie_Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie_Request" (
    "id" TEXT NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Movie_Request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_tmdbId_key" ON "Movie"("tmdbId");

-- CreateIndex
CREATE UNIQUE INDEX "Movie_Request_tmdbId_key" ON "Movie_Request"("tmdbId");

-- AddForeignKey
ALTER TABLE "Movie_Rating" ADD CONSTRAINT "Movie_Rating_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
