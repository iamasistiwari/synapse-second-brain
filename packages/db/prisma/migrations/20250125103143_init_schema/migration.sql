/*
  Warnings:

  - The values [Tweets,Videos,Documents,Notes] on the enum `PostType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PostType_new" AS ENUM ('Tweet', 'Video', 'Document', 'Note', 'Link');
ALTER TABLE "Content" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Content" ALTER COLUMN "type" TYPE "PostType_new" USING ("type"::text::"PostType_new");
ALTER TYPE "PostType" RENAME TO "PostType_old";
ALTER TYPE "PostType_new" RENAME TO "PostType";
DROP TYPE "PostType_old";
ALTER TABLE "Content" ALTER COLUMN "type" SET DEFAULT 'Note';
COMMIT;

-- AlterTable
ALTER TABLE "Content" ALTER COLUMN "type" SET DEFAULT 'Note';
