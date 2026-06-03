import { discussionRepository } from './discussion.repository.js'

export const discussionService = {
  getDiscussions: async (hashtag, limit, cursor) => {
    const take = Math.min(parseInt(limit) || 10, 50)
    const where = {}
    if (hashtag) {
      where.hashtags = { has: hashtag }
    }

    const queryOptions = {
      where,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { comments: true } }
      }
    }

    if (cursor) {
      queryOptions.cursor = { id: cursor }
      queryOptions.skip = 1
    }

    const discussions = await discussionRepository.findMany(queryOptions)

    const allTags = await discussionRepository.findAllHashtags()
    const tagCounts = {}
    allTags.forEach(d => {
      d.hashtags.forEach(t => {
        tagCounts[t] = (tagCounts[t] || 0) + 1
      })
    })
    const trendingTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({ tag, count }))

    return {
      discussions,
      trendingTags,
      nextCursor: discussions.length === take ? discussions[discussions.length - 1].id : null
    }
  },

  createDiscussion: async (authorId, authorName, authorAvatar, content, hashtags, files) => {
    let parsedTags = []
    if (hashtags) {
      parsedTags = typeof hashtags === 'string' ? JSON.parse(hashtags) : hashtags
    }

    const contentTags = (content.match(/#[\w\u00C0-\u024F]+/g) || []).map(t => t.slice(1))
    const allTags = [...new Set([...parsedTags, ...contentTags])]

    let attachmentUrls = []
    if (files && files.length > 0) {
      attachmentUrls = files.map(file => `data:${file.mimetype};base64,${file.buffer.toString('base64')}`)
    }

    return await discussionRepository.create({
      authorId,
      authorName: authorName || 'Anonymous',
      authorAvatar: authorAvatar || null,
      content,
      attachmentUrls,
      hashtags: allTags
    })
  },

  updateDiscussion: async (id, authorId, content, hashtags) => {
    const existing = await discussionRepository.findById(id)
    if (!existing) {
      throw new Error('NOT_FOUND')
    }
    if (existing.authorId !== authorId) {
      throw new Error('UNAUTHORIZED')
    }

    let parsedTags = existing.hashtags
    if (hashtags) {
      parsedTags = typeof hashtags === 'string' ? JSON.parse(hashtags) : hashtags
    }

    if (content) {
      const contentTags = (content.match(/#[\w\u00C0-\u024F]+/g) || []).map(t => t.slice(1))
      parsedTags = [...new Set([...parsedTags, ...contentTags])]
    }

    return await discussionRepository.update(id, {
      content: content || existing.content,
      hashtags: parsedTags
    })
  },

  deleteDiscussion: async (id, authorId) => {
    const existing = await discussionRepository.findById(id)
    if (!existing) {
      throw new Error('NOT_FOUND')
    }
    if (existing.authorId !== authorId) {
      throw new Error('UNAUTHORIZED')
    }

    await discussionRepository.delete(id)
  },

  reactToDiscussion: async (id, userId, type) => {
    const discussion = await discussionRepository.findById(id)
    if (!discussion) {
      throw new Error('NOT_FOUND')
    }

    const existingReaction = await discussionRepository.findReaction(userId, id)

    if (existingReaction) {
      if (existingReaction.type === type) {
        await discussionRepository.deleteReaction(existingReaction.id)
        const counterField = type === 'LIKE' ? 'likesCount' : 'dislikesCount'
        const updated = await discussionRepository.decrementCounter(id, counterField, 1)
        return {
          likesCount: updated.likesCount,
          dislikesCount: updated.dislikesCount,
          userReaction: null,
          action: 'removed'
        }
      } else {
        await discussionRepository.updateReaction(existingReaction.id, type)
        const incrementField = type === 'LIKE' ? 'likesCount' : 'dislikesCount'
        const decrementField = type === 'LIKE' ? 'dislikesCount' : 'likesCount'
        
        const updated = await discussionRepository.updateCounters(id, [incrementField], [decrementField])
        return {
          likesCount: updated.likesCount,
          dislikesCount: updated.dislikesCount,
          userReaction: type,
          action: 'swapped'
        }
      }
    } else {
      await discussionRepository.createReaction(userId, id, type)
      const counterField = type === 'LIKE' ? 'likesCount' : 'dislikesCount'
      const updated = await discussionRepository.incrementCounter(id, counterField, 1)
      return {
        likesCount: updated.likesCount,
        dislikesCount: updated.dislikesCount,
        userReaction: type,
        action: 'added'
      }
    }
  },

  getComments: async (discussionId) => {
    return await discussionRepository.findComments(discussionId)
  },

  addComment: async (discussionId, authorId, authorName, authorAvatar, content) => {
    const discussion = await discussionRepository.findById(discussionId)
    if (!discussion) {
      throw new Error('NOT_FOUND')
    }

    return await discussionRepository.createComment({
      discussionId,
      authorId,
      authorName: authorName || 'Anonymous',
      authorAvatar: authorAvatar || null,
      content
    })
  },

  getUserReaction: async (discussionId, userId) => {
    if (!userId) return null
    const reaction = await discussionRepository.findReaction(userId, discussionId)
    return reaction ? reaction.type : null
  },

  getDiscussionStats: async () => {
    const stats = await discussionRepository.getStats()
    
    const uniqueAuthors = new Set([
      ...stats.discussionAuthors.map(a => a.authorId),
      ...stats.commentAuthors.map(a => a.authorId)
    ])

    const baseMembers = Math.max(stats.registeredUsersCount, uniqueAuthors.size)
    
    return {
      members: baseMembers,
      topics: stats.topicsCount,
      solutions: stats.solutionsCount
    }
  }
}
