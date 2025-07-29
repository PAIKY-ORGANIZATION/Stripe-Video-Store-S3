/*
  Warnings:

  - You are about to drop the `video` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."video";

-- CreateTable
CREATE TABLE "public"."videos" (
    "id" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,
    "views" INTEGER NOT NULL,
    "s3Key" TEXT NOT NULL,
    "youtubeUrl" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);
