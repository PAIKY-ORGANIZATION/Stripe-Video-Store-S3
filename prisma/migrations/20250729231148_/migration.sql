-- CreateTable
CREATE TABLE "public"."user" (
    "id" TEXT NOT NULL,
    "oauth_accessToken" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_userTovideo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_userTovideo_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_userTovideo_B_index" ON "public"."_userTovideo"("B");

-- AddForeignKey
ALTER TABLE "public"."_userTovideo" ADD CONSTRAINT "_userTovideo_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_userTovideo" ADD CONSTRAINT "_userTovideo_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
