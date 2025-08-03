-- CreateTable
CREATE TABLE "public"."Refunds" (
    "id" TEXT NOT NULL,
    "stripeRefundId" TEXT NOT NULL,
    "purchaseId" TEXT NOT NULL,

    CONSTRAINT "Refunds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Refunds_purchaseId_key" ON "public"."Refunds"("purchaseId");

-- AddForeignKey
ALTER TABLE "public"."Refunds" ADD CONSTRAINT "Refunds_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "public"."purchases"("id") ON DELETE CASCADE ON UPDATE CASCADE;
