/*
  Warnings:

  - Changed the type of `status` on the `purchases` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."PurchaseStatus" AS ENUM ('SUCCESS', 'FAILURE', 'REFUNDED', 'DISPUTE');

-- CreateEnum
CREATE TYPE "public"."DisputeStatus" AS ENUM ('won', 'lost', 'needs_response', 'under_review', 'closed', 'warning_closed', 'warning_under_review', 'warning_needs_response');

-- DropForeignKey
ALTER TABLE "public"."purchases" DROP CONSTRAINT "purchases_refundId_fkey";

-- AlterTable
ALTER TABLE "public"."purchases" ADD COLUMN     "disputeId" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."PurchaseStatus" NOT NULL;

-- DropEnum
DROP TYPE "public"."Status";

-- CreateTable
CREATE TABLE "public"."Disputes" (
    "id" TEXT NOT NULL,
    "stripeDisputeId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "status" "public"."DisputeStatus" NOT NULL,

    CONSTRAINT "Disputes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Disputes_stripeDisputeId_key" ON "public"."Disputes"("stripeDisputeId");

-- AddForeignKey
ALTER TABLE "public"."purchases" ADD CONSTRAINT "purchases_refundId_fkey" FOREIGN KEY ("refundId") REFERENCES "public"."Refunds"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."purchases" ADD CONSTRAINT "purchases_disputeId_fkey" FOREIGN KEY ("disputeId") REFERENCES "public"."Disputes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
