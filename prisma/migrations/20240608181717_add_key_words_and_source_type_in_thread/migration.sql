-- AlterTable
ALTER TABLE "Thread" ADD COLUMN     "keyWords" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "sourceType" TEXT NOT NULL DEFAULT 'web_article';
