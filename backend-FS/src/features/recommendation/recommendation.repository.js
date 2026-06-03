import prisma from '../../config/prisma.js'

export const recommendationRepository = {
  createRecommendation: async (data) => {
    return await prisma.recommendation.create({
      data
    })
  },

  getRecommendationHistory: async () => {
    return await prisma.recommendation.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50
    })
  }
}
