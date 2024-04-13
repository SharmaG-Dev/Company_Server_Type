/*
  Warnings:

  - Added the required column `sortDisc` to the `blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blogs" ADD COLUMN     "sortDisc" VARCHAR(180) NOT NULL;
