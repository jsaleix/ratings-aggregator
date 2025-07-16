-- CreateEnum
CREATE TYPE "RatingUnit" AS ENUM ('points', 'stars', 'percentage');

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tmdbId" INTEGER NOT NULL,
    "tagLine" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "runtime" INTEGER NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,
    "year" INTEGER NOT NULL,
    "budget" DOUBLE PRECISION NOT NULL,
    "poster_path" TEXT NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie_Rating" (
    "id" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "ratingSource" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "ratingUnit" "RatingUnit" NOT NULL,
    "extra" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movie_Rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_tmdbId_key" ON "Movie"("tmdbId");

-- AddForeignKey
ALTER TABLE "Movie_Rating" ADD CONSTRAINT "Movie_Rating_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
