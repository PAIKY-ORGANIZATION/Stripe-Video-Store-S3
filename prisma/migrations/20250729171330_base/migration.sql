-- CreateTable
CREATE TABLE "public"."video" (
    "id" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,
    "views" INTEGER NOT NULL,
    "s3Key" TEXT NOT NULL,
    "youtubeUrl" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,

    CONSTRAINT "video_pkey" PRIMARY KEY ("id")
);
