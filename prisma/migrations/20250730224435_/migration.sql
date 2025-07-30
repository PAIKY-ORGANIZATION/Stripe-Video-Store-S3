/*
  Warnings:

  - You are about to drop the column `paymentIntent` on the `purchases` table. All the data in the column will be lost.
  - Added the required column `paymentIntentId` to the `purchases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."purchases" DROP COLUMN "paymentIntent",
ADD COLUMN     "paymentIntentId" TEXT NOT NULL;
