/*
  Warnings:

  - The primary key for the `Credential` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `Credential` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `Credential` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Credential` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Credential" DROP CONSTRAINT "Credential_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Identifier" DROP CONSTRAINT "Identifier_user_id_fkey";

-- DropIndex
DROP INDEX "Credential_user_id_key";

-- AlterTable
ALTER TABLE "Credential" DROP CONSTRAINT "Credential_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Credential_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "User";

-- CreateIndex
CREATE UNIQUE INDEX "Credential_username_key" ON "Credential"("username");
