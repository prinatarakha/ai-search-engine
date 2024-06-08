import { Prisma, PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient()

export const createThread = async (data: Prisma.ThreadCreateInput) => {
  const result = await prismaClient.thread.create({
    data: data,
  });
  return result;
}

export const updateThread = async (threadId: string, data: Prisma.ThreadUpdateInput) => {
  const result = await prismaClient.thread.update({
    where: {
      id: threadId,
    },
    data: data,
  });
  return result;
}

export const getThreadById = async (threadId: string) => {
  const result = await prismaClient.thread.findFirst({
    where: {
      id: threadId,
    },
  });
  return result;
}

export const getThreads = async (limit: number = 5) => {
  const result = await prismaClient.thread.findMany({
    take: limit,
    orderBy: [
      { updatedAt: 'desc' },
    ]
  });
  return result;
}
