-- CreateTable
CREATE TABLE "users" (
    "id" VARCHAR(64) NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "googleId" VARCHAR(200),
    "password" VARCHAR(200) NOT NULL,
    "profileId" VARCHAR(64) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" VARCHAR(64) NOT NULL,
    "avatar" VARCHAR(200),
    "email" VARCHAR(120),
    "googleId" VARCHAR(200),

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
