/*
  Warnings:

  - Added the required column `profileId` to the `RoomMessages` table without a default value. This is not possible if the table is not empty.
  - Made the column `queryRoomId` on table `RoomMessages` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "RoomMessages" DROP CONSTRAINT "RoomMessages_queryRoomId_fkey";

-- AlterTable
ALTER TABLE "RoomMessages" ADD COLUMN     "profileId" TEXT NOT NULL,
ALTER COLUMN "queryRoomId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "RoomMessages" ADD CONSTRAINT "RoomMessages_queryRoomId_fkey" FOREIGN KEY ("queryRoomId") REFERENCES "query_rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomMessages" ADD CONSTRAINT "RoomMessages_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
