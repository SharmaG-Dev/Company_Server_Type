/*
  Warnings:

  - Added the required column `userid` to the `view` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "view" ADD COLUMN     "userid" VARCHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE "view" ADD CONSTRAINT "view_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
