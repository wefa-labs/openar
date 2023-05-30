/*
  Warnings:

  - You are about to drop the column `identifier` on the `Credential` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "IdentifierType" AS ENUM ('ETHER', 'WEB', 'KEY');

-- AlterTable
ALTER TABLE "Credential" DROP COLUMN "identifier",
ADD COLUMN     "identifier_id" TEXT;

-- CreateTable
CREATE TABLE "Identifier" (
    "id" TEXT NOT NULL,
    "type" "IdentifierType" NOT NULL,

    CONSTRAINT "Identifier_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_identifier_id_fkey" FOREIGN KEY ("identifier_id") REFERENCES "Identifier"("id") ON DELETE SET NULL ON UPDATE CASCADE;
