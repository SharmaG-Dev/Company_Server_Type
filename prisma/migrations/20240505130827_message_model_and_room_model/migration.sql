-- CreateEnum
CREATE TYPE "QuerryStatus" AS ENUM ('solved', 'progress');

-- AlterTable
ALTER TABLE "blogs" ADD COLUMN     "isResolved" BOOLEAN;

-- CreateTable
CREATE TABLE "query_rooms" (
    "id" TEXT NOT NULL,
    "hashtag" TEXT NOT NULL,
    "QueryBlogId" VARCHAR(36) NOT NULL,
    "status" "QuerryStatus" NOT NULL DEFAULT 'progress',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "query_rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomMessages" (
    "id" TEXT NOT NULL,
    "message" VARCHAR(900) NOT NULL,
    "images" VARCHAR(120)[],
    "file" VARCHAR(120)[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "replyId" VARCHAR(36) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "queryRoomId" TEXT,

    CONSTRAINT "RoomMessages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "readed_message" (
    "profileId" VARCHAR(36) NOT NULL,
    "messageId" VARCHAR(36) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "readed_message_pkey" PRIMARY KEY ("profileId","messageId")
);

-- CreateTable
CREATE TABLE "RoomParticipants" (
    "profileId" VARCHAR(36) NOT NULL,
    "Roomid" VARCHAR(36) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoomParticipants_pkey" PRIMARY KEY ("profileId","Roomid")
);

-- CreateIndex
CREATE UNIQUE INDEX "query_rooms_hashtag_key" ON "query_rooms"("hashtag");

-- AddForeignKey
ALTER TABLE "query_rooms" ADD CONSTRAINT "query_rooms_QueryBlogId_fkey" FOREIGN KEY ("QueryBlogId") REFERENCES "blogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomMessages" ADD CONSTRAINT "RoomMessages_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "RoomMessages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomMessages" ADD CONSTRAINT "RoomMessages_queryRoomId_fkey" FOREIGN KEY ("queryRoomId") REFERENCES "query_rooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "readed_message" ADD CONSTRAINT "readed_message_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "readed_message" ADD CONSTRAINT "readed_message_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "RoomMessages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomParticipants" ADD CONSTRAINT "RoomParticipants_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomParticipants" ADD CONSTRAINT "RoomParticipants_Roomid_fkey" FOREIGN KEY ("Roomid") REFERENCES "query_rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
