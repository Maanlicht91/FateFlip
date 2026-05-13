/*
  Warnings:

  - The values [UNDEFINED,DOOM] on the enum `TypeStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TypeStatus_new" AS ENUM ('BLOOM', 'GLOOM', 'LOOM');
ALTER TABLE "public"."Fate" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Fate" ALTER COLUMN "type" TYPE "TypeStatus_new" USING ("type"::text::"TypeStatus_new");
ALTER TYPE "TypeStatus" RENAME TO "TypeStatus_old";
ALTER TYPE "TypeStatus_new" RENAME TO "TypeStatus";
DROP TYPE "public"."TypeStatus_old";
ALTER TABLE "Fate" ALTER COLUMN "type" SET DEFAULT 'LOOM';
COMMIT;

-- AlterTable
ALTER TABLE "Fate" ALTER COLUMN "type" SET DEFAULT 'LOOM';
