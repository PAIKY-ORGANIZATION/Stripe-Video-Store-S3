/*
  Warnings:

  - You are about to drop the column `Reason` on the `Refunds` table. All the data in the column will be lost.
  - Added the required column `reason` to the `Refunds` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Refunds" DROP COLUMN "Reason",
ADD COLUMN     "reason" TEXT NOT NULL;
