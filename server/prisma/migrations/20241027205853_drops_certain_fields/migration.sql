/*
  Warnings:

  - You are about to drop the column `about` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "about",
DROP COLUMN "username",
ALTER COLUMN "email" DROP NOT NULL;
