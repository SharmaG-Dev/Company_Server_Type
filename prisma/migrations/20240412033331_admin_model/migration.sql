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
