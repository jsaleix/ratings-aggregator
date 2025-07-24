-- CreateEnum
CREATE TYPE "RatingUnit" AS ENUM ('points', 'stars', 'percentage');

-- CreateEnum
CREATE TYPE "RatingsStatus" AS ENUM ('pending', 'completed', 'failed');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin', 'mod');

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "tagLine" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "runtime" INTEGER NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,
    "year" INTEGER NOT NULL,
    "budget" DOUBLE PRECISION NOT NULL,
    "poster_path" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
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
    "userId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Movie_Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_tmdbId_key" ON "Movie"("tmdbId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Movie_Rating" ADD CONSTRAINT "Movie_Rating_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movie_Request" ADD CONSTRAINT "Movie_Request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
