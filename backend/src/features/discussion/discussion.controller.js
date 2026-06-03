import { discussionService } from './discussion.service.js'

export const getDiscussions = async (req, res, next) => {
  try {
    const { hashtag, limit, cursor } = req.query
    const result = await discussionService.getDiscussions(hashtag, limit, cursor)

    return res.status(200).json({
      status: 'sukses',
      data: result.discussions,
      trendingTags: result.trendingTags,
      nextCursor: result.nextCursor
    })
  } catch (error) {
    next(error)
  }
}

export const createDiscussion = async (req, res, next) => {
  try {
    const { content, hashtags, authorId, authorName, authorAvatar } = req.body

    if (!authorId || !content) {
      return res.status(400).json({
        status: 'error',
        message: 'Konten dan authorId wajib diisi.'
      })
    }

    const discussion = await discussionService.createDiscussion(
      authorId, authorName, authorAvatar, content, hashtags, req.files
    )

    return res.status(201).json({
      status: 'sukses',
      message: 'Diskusi berhasil dibuat.',
      data: discussion
    })
  } catch (error) {
    next(error)
  }
}

export const updateDiscussion = async (req, res, next) => {
  try {
    const { id } = req.params
    const { content, hashtags, authorId } = req.body

    if (!authorId) {
      return res.status(401).json({
        status: 'error',
        message: 'Unauthorized: authorId wajib disertakan.'
      })
    }

    try {
      const updated = await discussionService.updateDiscussion(id, authorId, content, hashtags)
      return res.status(200).json({
        status: 'sukses',
        message: 'Diskusi berhasil diperbarui.',
        data: updated
      })
    } catch (err) {
      if (err.message === 'NOT_FOUND') {
        return res.status(404).json({
          status: 'error',
          message: 'Diskusi tidak ditemukan.'
        })
      }
      if (err.message === 'UNAUTHORIZED') {
        return res.status(403).json({
          status: 'error',
          message: 'Anda tidak memiliki izin untuk mengedit diskusi ini.'
        })
      }
      throw err
    }
  } catch (error) {
    next(error)
  }
}

export const deleteDiscussion = async (req, res, next) => {
  try {
    const { id } = req.params
    const { authorId } = req.body

    if (!authorId) {
      return res.status(401).json({
        status: 'error',
        message: 'Unauthorized: authorId wajib disertakan.'
      })
    }

    try {
      await discussionService.deleteDiscussion(id, authorId)
      return res.status(200).json({
        status: 'sukses',
        message: 'Diskusi berhasil dihapus.'
      })
    } catch (err) {
      if (err.message === 'NOT_FOUND') {
        return res.status(404).json({
          status: 'error',
          message: 'Diskusi tidak ditemukan.'
        })
      }
      if (err.message === 'UNAUTHORIZED') {
        return res.status(403).json({
          status: 'error',
          message: 'Anda tidak memiliki izin untuk menghapus diskusi ini.'
        })
      }
      throw err
    }
  } catch (error) {
    next(error)
  }
}

export const reactToDiscussion = async (req, res, next) => {
  try {
    const { id } = req.params
    const { userId, type } = req.body

    if (!userId || !type || !['LIKE', 'DISLIKE'].includes(type)) {
      return res.status(400).json({
        status: 'error',
        message: 'userId dan type (LIKE/DISLIKE) wajib diisi.'
      })
    }

    try {
      const result = await discussionService.reactToDiscussion(id, userId, type)
      
      let message = ''
      if (result.action === 'removed') message = 'Reaksi dibatalkan.'
      else if (result.action === 'swapped') message = `Reaksi diubah menjadi ${type}.`
      else message = `Berhasil ${type === 'LIKE' ? 'menyukai' : 'tidak menyukai'} diskusi.`

      return res.status(200).json({
        status: 'sukses',
        message,
        data: {
          likesCount: result.likesCount,
          dislikesCount: result.dislikesCount,
          userReaction: result.userReaction
        }
      })
    } catch (err) {
      if (err.message === 'NOT_FOUND') {
        return res.status(404).json({
          status: 'error',
          message: 'Diskusi tidak ditemukan.'
        })
      }
      throw err
    }
  } catch (error) {
    next(error)
  }
}

export const getComments = async (req, res, next) => {
  try {
    const { id } = req.params
    const comments = await discussionService.getComments(id)
    return res.status(200).json({
      status: 'sukses',
      data: comments
    })
  } catch (error) {
    next(error)
  }
}

export const addComment = async (req, res, next) => {
  try {
    const { id } = req.params
    const { authorId, authorName, authorAvatar, content } = req.body

    if (!authorId || !content) {
      return res.status(400).json({
        status: 'error',
        message: 'authorId dan content wajib diisi.'
      })
    }

    try {
      const comment = await discussionService.addComment(id, authorId, authorName, authorAvatar, content)
      return res.status(201).json({
        status: 'sukses',
        message: 'Komentar berhasil ditambahkan.',
        data: comment
      })
    } catch (err) {
      if (err.message === 'NOT_FOUND') {
        return res.status(404).json({
          status: 'error',
          message: 'Diskusi tidak ditemukan.'
        })
      }
      throw err
    }
  } catch (error) {
    next(error)
  }
}

export const getUserReaction = async (req, res, next) => {
  try {
    const { id } = req.params
    const { userId } = req.query

    const reactionType = await discussionService.getUserReaction(id, userId)
    return res.status(200).json({
      status: 'sukses',
      data: reactionType
    })
  } catch (error) {
    next(error)
  }
}

export const getDiscussionStats = async (req, res, next) => {
  try {
    const stats = await discussionService.getDiscussionStats()
    return res.status(200).json({
      status: 'sukses',
      data: stats
    })
  } catch (error) {
    next(error)
  }
}
