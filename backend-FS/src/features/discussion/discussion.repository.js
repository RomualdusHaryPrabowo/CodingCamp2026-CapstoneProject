import prisma from '../../config/prisma.js'

export const discussionRepository = {
  findMany: async (queryOptions) => {
    return await prisma.discussion.findMany(queryOptions)
  },

  findAllHashtags: async () => {
    return await prisma.discussion.findMany({
      select: { hashtags: true }
    })
  },

  create: async (data) => {
    return await prisma.discussion.create({
      data,
      include: {
        _count: { select: { comments: true } }
      }
    })
  },

  findById: async (id) => {
    return await prisma.discussion.findUnique({ where: { id } })
  },

  update: async (id, data) => {
    return await prisma.discussion.update({
      where: { id },
      data,
      include: {
        _count: { select: { comments: true } }
      }
    })
  },

  delete: async (id) => {
    return await prisma.discussion.delete({ where: { id } })
  },

  findReaction: async (userId, discussionId) => {
    return await prisma.reaction.findUnique({
      where: { userId_discussionId: { userId, discussionId } }
    })
  },

  deleteReaction: async (id) => {
    return await prisma.reaction.delete({ where: { id } })
  },

  updateReaction: async (id, type) => {
    return await prisma.reaction.update({
      where: { id },
      data: { type }
    })
  },

  createReaction: async (userId, discussionId, type) => {
    return await prisma.reaction.create({
      data: { userId, discussionId, type }
    })
  },

  incrementCounter: async (id, field, amount) => {
    return await prisma.discussion.update({
      where: { id },
      data: { [field]: { increment: amount } }
    })
  },

  decrementCounter: async (id, field, amount) => {
    return await prisma.discussion.update({
      where: { id },
      data: { [field]: { decrement: amount } }
    })
  },

  updateCounters: async (id, increments, decrements) => {
    const data = {}
    if (increments.length) {
      increments.forEach(field => { data[field] = { increment: 1 } })
    }
    if (decrements.length) {
      decrements.forEach(field => { data[field] = { decrement: 1 } })
    }
    return await prisma.discussion.update({
      where: { id },
      data
    })
  },

  findComments: async (discussionId) => {
    return await prisma.comment.findMany({
      where: { discussionId },
      orderBy: { createdAt: 'asc' }
    })
  },

  createComment: async (data) => {
    return await prisma.comment.create({
      data
    })
  },

  getStats: async () => {
    const registeredUsersCount = await prisma.user.count()
    const discussionAuthors = await prisma.discussion.groupBy({ by: ['authorId'] })
    const commentAuthors = await prisma.comment.groupBy({ by: ['authorId'] })
    const topicsCount = await prisma.discussion.count()
    const solutionsCount = await prisma.comment.count()

    return {
      registeredUsersCount,
      discussionAuthors,
      commentAuthors,
      topicsCount,
      solutionsCount
    }
  }
}
