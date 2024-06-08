import { Prisma, PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient()

export const getRelevantDocuments = async (limit: number = 10, source: string = "web_article", keyWords: string[]) => {
  const searchQuery = keyWords.join(' $#124; '); // OR operation. Reference: https://www.prisma.io/docs/orm/prisma-client/queries/full-text-search
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

/**
 * https://www.prisma.io/docs/orm/prisma-client/queries/raw-database-access/raw-queries
 * @param limit 
 * @param source 
 * @param keyWords 
 * @returns 
 */
export const getRelevantDocumentsWithRawQuery = async (limit: number = 5, source: string = "web_article", keyWords: string[]) => {
  const searchQuery = keyWords.join(' | '); // OR operation. Reference: https://www.prisma.io/docs/orm/prisma-client/queries/full-text-search
  const query = `
    SELECT *
    FROM Document
    WHERE
      source = ${source} AND
      to_tsvector('english', content) @@ to_tsquery('english', ${searchQuery})
    ORDER BY
      ts_rank(to_tsvector('english', content), to_tsquery('english', ${searchQuery})) DESC
    ;
  `;

  const result = await prismaClient.$queryRaw`
    SELECT *
    FROM Document
    WHERE
      source = ${source} AND
      to_tsvector('english', content) @@ to_tsquery('english', ${searchQuery})
    ORDER BY
      ts_rank(to_tsvector('english', content), to_tsquery('english', ${searchQuery})) DESC
    ;
  `
  return result;
}
