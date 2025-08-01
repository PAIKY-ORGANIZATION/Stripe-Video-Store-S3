/*
  Warnings:

  - Added the required column `success` to the `purchases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."purchases" ADD COLUMN     "failureCode" TEXT,
ADD COLUMN     "failureMessage" TEXT,
ADD COLUMN     "success" BOOLEAN NOT NULL;
