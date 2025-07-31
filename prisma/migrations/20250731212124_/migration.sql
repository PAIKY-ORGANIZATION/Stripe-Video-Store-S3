-- CreateTable
CREATE TABLE "public"."ProcessedStripeEvents" (
    "id" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProcessedStripeEvents_pkey" PRIMARY KEY ("id")
);
