/*
  Warnings:

  - The values [GOOD,BAD] on the enum `TypeStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Fate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Fate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TypeStatus_new" AS ENUM ('UNDEFINED', 'BLOOM', 'DOOM');
ALTER TABLE "public"."Fate" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Fate" ALTER COLUMN "type" TYPE "TypeStatus_new" USING ("type"::text::"TypeStatus_new");
ALTER TYPE "TypeStatus" RENAME TO "TypeStatus_old";
ALTER TYPE "TypeStatus_new" RENAME TO "TypeStatus";
DROP TYPE "public"."TypeStatus_old";
ALTER TABLE "Fate" ALTER COLUMN "type" SET DEFAULT 'UNDEFINED';
COMMIT;

-- AlterTable
ALTER TABLE "Fate" ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "imageUrl" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Fate_slug_key" ON "Fate"("slug");
