-- Align the database with the current Prisma schema and backend code.
ALTER TABLE "Luck" RENAME TO "Fate";

ALTER TABLE "Fate" RENAME CONSTRAINT "Luck_pkey" TO "Fate_pkey";

ALTER TYPE "TypeStatus" RENAME VALUE 'BOTH' TO 'UNDEFINED';

ALTER TABLE "Fate"
ALTER COLUMN "type" SET DEFAULT 'UNDEFINED',
ALTER COLUMN "createdBy" DROP NOT NULL;
