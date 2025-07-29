/*
  Warnings:

  - You are about to drop the column `oauth_accessToken` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."user" DROP COLUMN "oauth_accessToken";

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "public"."user"("email");
