/*
  Warnings:

  - A unique constraint covering the columns `[stripeRefundId]` on the table `Refunds` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Refunds_stripeRefundId_key" ON "public"."Refunds"("stripeRefundId");
