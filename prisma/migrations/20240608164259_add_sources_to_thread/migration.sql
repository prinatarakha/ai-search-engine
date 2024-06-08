-- AlterTable
ALTER TABLE "Thread" ADD COLUMN     "sources" TEXT[] DEFAULT ARRAY[]::TEXT[];
