/*
  Warnings:

  - Added the required column `solved` to the `Refunds` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Refunds" ADD COLUMN     "solved" BOOLEAN NOT NULL;
