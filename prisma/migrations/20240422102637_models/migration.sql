-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'rejected', 'accepted');

-- CreateTable
CREATE TABLE "users" (
    "id" VARCHAR(64) NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "googleId" VARCHAR(200),
    "password" VARCHAR(200) NOT NULL,
    "profileId" VARCHAR(64) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" VARCHAR(64) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "avatar" VARCHAR(200),
    "email" VARCHAR(120) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "googleId" VARCHAR(200),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "friendId" VARCHAR(36),

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FriendsRequest" (
    "id" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'pending',
    "receiverId" VARCHAR(36) NOT NULL,
    "senderId" VARCHAR(36) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FriendsRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blogs" (
    "id" VARCHAR(36) NOT NULL,
    "title" VARCHAR(180) NOT NULL,
    "sortDisc" VARCHAR(180) NOT NULL,
    "images" TEXT[],
    "longDisc" VARCHAR(8000) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "profileId" VARCHAR(64) NOT NULL,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" VARCHAR(36) NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" VARCHAR(64),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_tags" (
    "blogId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_tags_pkey" PRIMARY KEY ("blogId","tagId")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" VARCHAR(36) NOT NULL,
    "comment" VARCHAR(200) NOT NULL,
    "isSubComment" BOOLEAN NOT NULL DEFAULT false,
    "commentId" VARCHAR(36),
    "profileId" VARCHAR(64) NOT NULL,
    "blogId" VARCHAR(36) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "id" VARCHAR(36) NOT NULL,
    "isBlog" BOOLEAN NOT NULL DEFAULT true,
    "isComment" BOOLEAN NOT NULL DEFAULT false,
    "userId" VARCHAR(64) NOT NULL,
    "commentsId" VARCHAR(36),
    "blogId" VARCHAR(36),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "view" (
    "id" VARCHAR(36) NOT NULL,
    "isBlog" BOOLEAN NOT NULL DEFAULT true,
    "isProfile" BOOLEAN NOT NULL DEFAULT false,
    "userid" VARCHAR(36) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "blogId" VARCHAR(36),
    "profileId" VARCHAR(64),

    CONSTRAINT "view_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "email" VARCHAR(80) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "password" VARCHAR(80) NOT NULL,
    "avatar" VARCHAR(120) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tags_title_key" ON "tags"("title");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendsRequest" ADD CONSTRAINT "FriendsRequest_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendsRequest" ADD CONSTRAINT "FriendsRequest_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_tags" ADD CONSTRAINT "blog_tags_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "blogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_tags" ADD CONSTRAINT "blog_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "blogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_commentsId_fkey" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "blogs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "view" ADD CONSTRAINT "view_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "view" ADD CONSTRAINT "view_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "blogs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "view" ADD CONSTRAINT "view_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
