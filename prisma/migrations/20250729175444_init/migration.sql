/*
  Warnings:

  - You are about to drop the column `s3Key` on the `videos` table. All the data in the column will be lost.
  - Added the required column `s3ThumbnailKey` to the `videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `s3VideoKey` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."videos" DROP COLUMN "s3Key",
ADD COLUMN     "s3ThumbnailKey" TEXT NOT NULL,
ADD COLUMN     "s3VideoKey" TEXT NOT NULL;
