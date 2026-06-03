import prisma from '../../config/prisma.js'

export const historyRepository = {
  findMany: async (whereClause) => {
    return await prisma.history.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc'
      }
    })
  },

  create: async (data) => {
    return await prisma.history.create({
      data
    })
  }
}
