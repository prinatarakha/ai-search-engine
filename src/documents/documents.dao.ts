import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient()

export const getRelevantDocuments = async (limit: number = 10, source: string = "web_article", keyWords: string[]) => {
  const searchQuery = keyWords.join(' | '); // OR operator. Reference: https://www.prisma.io/docs/orm/prisma-client/queries/full-text-search
  const result = await prismaClient.document.findMany({
    take: limit,
    where: {
      source: source,
      content: {
        search: searchQuery, // contains at least one of these key words
      }
    }
  });
  return result;
}
