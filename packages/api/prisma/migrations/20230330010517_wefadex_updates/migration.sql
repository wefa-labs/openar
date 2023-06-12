/*
  Warnings:

  - You are about to drop the `DeviceCredential` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "WefaElement" AS ENUM ('WATER', 'EARTH', 'FIRE', 'AIR');

-- DropForeignKey
ALTER TABLE "DeviceCredential" DROP CONSTRAINT "DeviceCredential_identifier_id_fkey";

-- DropTable
DROP TABLE "DeviceCredential";

-- CreateTable
CREATE TABLE "Wefadex" (
    "id" TEXT NOT NULL,
    "public_key" BYTEA NOT NULL,
    "name" TEXT,
    "counter" BIGINT NOT NULL,
    "identifier_id" TEXT,
    "elements" "WefaElement"[],

    CONSTRAINT "Wefadex_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wefadex_name_key" ON "Wefadex"("name");

-- AddForeignKey
ALTER TABLE "Wefadex" ADD CONSTRAINT "Wefadex_identifier_id_fkey" FOREIGN KEY ("identifier_id") REFERENCES "Identifier"("id") ON DELETE SET NULL ON UPDATE CASCADE;
