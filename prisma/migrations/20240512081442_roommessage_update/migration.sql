-- DropForeignKey
ALTER TABLE "RoomMessages" DROP CONSTRAINT "RoomMessages_replyId_fkey";

-- AlterTable
ALTER TABLE "RoomMessages" ALTER COLUMN "replyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "RoomMessages" ADD CONSTRAINT "RoomMessages_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "RoomMessages"("id") ON DELETE SET NULL ON UPDATE CASCADE;
