import express from 'express'
import {
  predictCareerSpecific,
  getRecommendationHistory,
  predictCareer,
  getGeneralRecommendation
} from './recommendation.controller.js'

const router = express.Router()

router.post('/predict-career', predictCareer)
router.post('/specific', predictCareerSpecific)
router.post('/general', getGeneralRecommendation)
router.get('/history', getRecommendationHistory)

export default router
