-- CreateTable
CREATE TABLE "public"."Movie_Ratings_Summary" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL DEFAULT 'N/A',
    "movieId" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movie_Ratings_Summary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Movie_Ratings_Summary" ADD CONSTRAINT "Movie_Ratings_Summary_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "public"."Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
