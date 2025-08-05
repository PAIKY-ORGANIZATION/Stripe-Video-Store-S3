/*
  Warnings:

  - The values [DISPUTE] on the enum `PurchaseStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."PurchaseStatus_new" AS ENUM ('SUCCESS', 'FAILURE', 'REFUNDED', 'DISPUTED');
ALTER TABLE "public"."purchases" ALTER COLUMN "status" TYPE "public"."PurchaseStatus_new" USING ("status"::text::"public"."PurchaseStatus_new");
ALTER TYPE "public"."PurchaseStatus" RENAME TO "PurchaseStatus_old";
ALTER TYPE "public"."PurchaseStatus_new" RENAME TO "PurchaseStatus";
DROP TYPE "public"."PurchaseStatus_old";
COMMIT;
