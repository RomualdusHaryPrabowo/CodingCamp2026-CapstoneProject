import express from 'express'
import {
  getHistoriesByGuestId,
  createHistory
} from './history.controller.js'

const router = express.Router()

router.get('/history', getHistoriesByGuestId)
router.post('/history', createHistory)

export default router
