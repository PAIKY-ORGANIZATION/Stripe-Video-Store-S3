/*
  Warnings:

  - You are about to drop the column `currency` on the `videos` table. All the data in the column will be lost.
  - You are about to drop the column `youtubeUrl` on the `videos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."purchases" DROP CONSTRAINT "purchases_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."purchases" DROP CONSTRAINT "purchases_videoId_fkey";

-- AlterTable
ALTER TABLE "public"."videos" DROP COLUMN "currency",
DROP COLUMN "youtubeUrl";

-- AddForeignKey
ALTER TABLE "public"."purchases" ADD CONSTRAINT "purchases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."purchases" ADD CONSTRAINT "purchases_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "public"."videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
