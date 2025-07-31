/*
  Warnings:

  - Added the required column `checkoutSessionId` to the `purchases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."purchases" ADD COLUMN     "checkoutSessionId" TEXT NOT NULL;
