/*
  Warnings:

  - You are about to drop the column `user_id` on the `Identifier` table. All the data in the column will be lost.
  - You are about to drop the `Credential` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Credential" DROP CONSTRAINT "Credential_identifier_id_fkey";

-- DropIndex
DROP INDEX "Identifier_user_id_key";

-- AlterTable
ALTER TABLE "Identifier" DROP COLUMN "user_id";

-- DropTable
DROP TABLE "Credential";

-- CreateTable
CREATE TABLE "DeviceCredential" (
    "id" TEXT NOT NULL,
    "key" INTEGER[],
    "username" TEXT,
    "identifier_id" TEXT,
    "counter" INTEGER NOT NULL,

    CONSTRAINT "DeviceCredential_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeviceCredential_username_key" ON "DeviceCredential"("username");

-- AddForeignKey
ALTER TABLE "DeviceCredential" ADD CONSTRAINT "DeviceCredential_identifier_id_fkey" FOREIGN KEY ("identifier_id") REFERENCES "Identifier"("id") ON DELETE SET NULL ON UPDATE CASCADE;
