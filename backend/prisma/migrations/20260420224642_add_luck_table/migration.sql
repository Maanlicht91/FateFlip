-- CreateEnum
CREATE TYPE "TypeStatus" AS ENUM ('BOTH', 'GOOD', 'BAD');

-- CreateTable
CREATE TABLE "Luck" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "TypeStatus" NOT NULL DEFAULT 'BOTH',
    "imageUrl" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Luck_pkey" PRIMARY KEY ("id")
);
