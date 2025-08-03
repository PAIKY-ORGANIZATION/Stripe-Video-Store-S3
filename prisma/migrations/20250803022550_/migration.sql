/*
  Warnings:

  - You are about to drop the column `purchaseId` on the `Refunds` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Refunds" DROP CONSTRAINT "Refunds_purchaseId_fkey";

-- DropIndex
DROP INDEX "public"."Refunds_purchaseId_key";

-- AlterTable
ALTER TABLE "public"."Refunds" DROP COLUMN "purchaseId";

-- AlterTable
ALTER TABLE "public"."purchases" ADD COLUMN     "refundId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."purchases" ADD CONSTRAINT "purchases_refundId_fkey" FOREIGN KEY ("refundId") REFERENCES "public"."Refunds"("id") ON DELETE SET NULL ON UPDATE CASCADE;
