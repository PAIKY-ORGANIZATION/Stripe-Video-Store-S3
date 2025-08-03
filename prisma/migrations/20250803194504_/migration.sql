/*
  Warnings:

  - You are about to drop the column `success` on the `purchases` table. All the data in the column will be lost.
  - Added the required column `status` to the `purchases` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('SUCCESS', 'FAILURE', 'REFUNDED');

-- AlterTable
ALTER TABLE "public"."purchases" DROP COLUMN "success",
ADD COLUMN     "status" "public"."Status" NOT NULL;
