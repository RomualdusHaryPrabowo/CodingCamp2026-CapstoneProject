/*
  Warnings:

  - You are about to drop the column `attachmentUrl` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `attachmentUrl` on the `Discussion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "attachmentUrl";

-- AlterTable
ALTER TABLE "Discussion" DROP COLUMN "attachmentUrl",
ADD COLUMN     "attachmentUrls" TEXT[];

-- AlterTable
ALTER TABLE "History" ADD COLUMN     "type" VARCHAR(50) NOT NULL DEFAULT 'GENERAL';
