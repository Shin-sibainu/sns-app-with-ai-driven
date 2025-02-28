/*
  Warnings:

  - The primary key for the `follows` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `likes` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_follower_id_fkey";

-- DropForeignKey
ALTER TABLE "follows" DROP CONSTRAINT "follows_following_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_user_id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_user_id_fkey";

-- AlterTable
ALTER TABLE "follows" DROP CONSTRAINT "follows_pkey",
ALTER COLUMN "follower_id" SET DATA TYPE TEXT,
ALTER COLUMN "following_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "follows_pkey" PRIMARY KEY ("follower_id", "following_id");

-- AlterTable
ALTER TABLE "likes" DROP CONSTRAINT "likes_pkey",
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "likes_pkey" PRIMARY KEY ("user_id", "post_id");

-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
