import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

const client = axios.create({
  baseURL: `${BACKEND_URL}/api/v1/discussions`,
  timeout: 30000
})

export const fetchDiscussions = async ({ hashtag, limit = 10, cursor } = {}) => {
  const params = { limit }
  if (hashtag) params.hashtag = hashtag
  if (cursor) params.cursor = cursor
  const response = await client.get('/', { params })
  return response.data
}

export const createDiscussionPost = async ({ content, hashtags, authorId, authorName, authorAvatar, attachments }) => {
  const formData = new FormData()
  formData.append('content', content)
  formData.append('authorId', authorId)
  formData.append('authorName', authorName || 'Anonymous')
  if (authorAvatar) formData.append('authorAvatar', authorAvatar)
  if (hashtags && hashtags.length > 0) formData.append('hashtags', JSON.stringify(hashtags))
  if (attachments && attachments.length > 0) {
    attachments.forEach(file => formData.append('attachments', file))
  }

  const response = await client.post('/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data
}

export const updateDiscussionPost = async (id, { content, hashtags, authorId }) => {
  const response = await client.put(`/${id}`, { content, hashtags, authorId })
  return response.data
}

export const deleteDiscussionPost = async (id, authorId) => {
  const response = await client.delete(`/${id}`, { data: { authorId } })
  return response.data
}

export const reactToDiscussion = async (discussionId, userId, type) => {
  const response = await client.post(`/${discussionId}/react`, { userId, type })
  return response.data
}

export const fetchComments = async (discussionId) => {
  const response = await client.get(`/${discussionId}/comments`)
  return response.data
}

export const addCommentToDiscussion = async (discussionId, { authorId, authorName, authorAvatar, content }) => {
  const response = await client.post(`/${discussionId}/comments`, { authorId, authorName, authorAvatar, content })
  return response.data
}

export const getUserReaction = async (discussionId, userId) => {
  const response = await client.get(`/${discussionId}/user-reaction`, { params: { userId } })
  return response.data
}

export const fetchDiscussionStats = async () => {
  const response = await client.get('/stats')
  return response.data
}
