/*
  Warnings:

  - Made the column `email` on table `profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "profile" ALTER COLUMN "email" SET NOT NULL;
