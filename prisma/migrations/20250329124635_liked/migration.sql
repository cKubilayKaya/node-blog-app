/*
  Warnings:

  - You are about to drop the column `viewCount` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "viewCount",
ADD COLUMN     "liked" INTEGER NOT NULL DEFAULT 0;
