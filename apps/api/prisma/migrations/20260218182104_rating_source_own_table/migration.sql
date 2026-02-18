-- AlterTable
ALTER TABLE "Movie_Rating" ADD COLUMN     "rating_source_id" TEXT;

-- CreateTable
CREATE TABLE "Rating_Source" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rating_unit" "RatingUnit" NOT NULL,
    "url" TEXT NOT NULL,
    "country_code" TEXT NOT NULL,

    CONSTRAINT "Rating_Source_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rating_Source_code_key" ON "Rating_Source"("code");

-- AddForeignKey
ALTER TABLE "Movie_Rating" ADD CONSTRAINT "Movie_Rating_rating_source_id_fkey" FOREIGN KEY ("rating_source_id") REFERENCES "Rating_Source"("id") ON DELETE SET NULL ON UPDATE CASCADE;
