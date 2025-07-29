/*
  Warnings:

  - You are about to drop the column `s3ThumbnailKey` on the `videos` table. All the data in the column will be lost.
  - Added the required column `thumbnailLocalPath` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."videos" DROP COLUMN "s3ThumbnailKey",
ADD COLUMN     "thumbnailLocalPath" TEXT NOT NULL;
