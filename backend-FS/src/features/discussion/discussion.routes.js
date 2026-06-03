import express from 'express'
import { upload } from '../../utils/upload.js'
import {
  getDiscussions,
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  reactToDiscussion,
  getComments,
  addComment,
  getUserReaction,
  getDiscussionStats
} from './discussion.controller.js'

const router = express.Router()

router.get('/', getDiscussions)
router.get('/stats', getDiscussionStats)
router.post('/', upload.array('attachments', 4), createDiscussion)
router.put('/:id', updateDiscussion)
router.delete('/:id', deleteDiscussion)

router.post('/:id/react', reactToDiscussion)
router.get('/:id/user-reaction', getUserReaction)

router.get('/:id/comments', getComments)
router.post('/:id/comments', addComment)

export default router
