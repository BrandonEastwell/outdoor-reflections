/*
  Warnings:

  - Added the required column `lastEditedAt` to the `reflection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reflection" ADD COLUMN     "lastEditedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "refresh_token" (
    "id" UUID NOT NULL,
    "userId" INTEGER NOT NULL,
    "tokenHash" TEXT,
    "device" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "refresh_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_userId_device_key" ON "refresh_token"("userId", "device");

-- AddForeignKey
ALTER TABLE "refresh_token" ADD CONSTRAINT "refresh_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
