import { recommendationService } from './recommendation.service.js'
import { recommendationRepository } from './recommendation.repository.js'
import { historyRepository } from '../history/history.repository.js'
import {
  ShortFormInputSchema,
  PredictCareerSchema,
  GeneralRecommendationSchema
} from './recommendation.schema.js'

export const getGeneralRecommendation = async (req, res, next) => {
  try {
    const { guest_id, hard_skills, soft_skills } = GeneralRecommendationSchema.parse(req.body)

    const aiResult = await recommendationService.getGeneralRecommendation(hard_skills, soft_skills)

    const predictedCareer = aiResult.rekomendasi_utama || 'Unknown'
    const topProbability = aiResult.tingkat_keyakinan || 0.0

    let newHistory = null
    if (guest_id) {
      newHistory = await historyRepository.create({
        guest_id: guest_id,
        hard_skill: hard_skills,
        soft_skill: soft_skills,
        prediction_result: predictedCareer,
        probability: topProbability,
        type: "GENERAL",
        analisis_dinamis: aiResult.analisis_dinamis || null
      })
    }

    return res.status(201).json({
      status: 'sukses',
      message: guest_id ? 'Prediksi berhasil dan riwayat telah disimpan' : 'Prediksi berhasil tanpa disimpan',
      data: {
        ...(newHistory || {}),
        prediction_result: predictedCareer,
        probability: topProbability,
        detail_matriks: aiResult.detail_matriks,
        analisis_dinamis: aiResult.analisis_dinamis || null
      }
    })
  } catch (error) {
    next(error)
  }
}

export const predictCareer = async (req, res, next) => {
  try {
    const { hard_skills, soft_skills, guest_id } = PredictCareerSchema.parse(req.body)

    let result
    try {
      result = await recommendationService.predictCareer(hard_skills, soft_skills)
    } catch (err) {
      if (err.message === 'LAYANAN_AI_TIDAK_TERSEDIA') {
        return res.status(503).json({
          status: 'error',
          message: 'Layanan AI tidak tersedia. Silakan coba lagi.'
        })
      }
      throw err
    }

    if (!result || result.status !== 'sukses') {
      return res.status(502).json({
        status: 'error',
        message: 'Respons dari AI tidak valid'
      })
    }

    const saved = await recommendationRepository.createRecommendation({
      targetCareer: result.rekomendasi_utama || 'Unknown',
      skillsInput: {
        hard_skills: hard_skills,
        soft_skills: soft_skills
      },
      recommendedCareer: result.rekomendasi_utama,
      confidencePercent: result.tingkat_keyakinan,
      allPredictions: result.detail_matriks
    })

    if (guest_id) {
      await historyRepository.create({
        guest_id: guest_id,
        hard_skill: hard_skills,
        soft_skill: soft_skills,
        prediction_result: result.rekomendasi_utama || 'Unknown',
        probability: result.tingkat_keyakinan || 0.0,
        type: "SPECIFIC",
        analisis_dinamis: result.analisis_dinamis || null
      })
    }

    res.status(200).json({
      status: 'sukses',
      data: {
        id: saved.id,
        rekomendasi_utama: result.rekomendasi_utama,
        tingkat_keyakinan: result.tingkat_keyakinan,
        detail_matriks: result.detail_matriks,
        analisis_dinamis: result.analisis_dinamis || null
      }
    })
  } catch (error) {
    next(error)
  }
}

export const predictCareerSpecific = async (req, res, next) => {
  try {
    const validatedData = ShortFormInputSchema.parse({
      targetCareer: req.body.target_career,
      skillsFilled: req.body.skills_filled
    })

    const { targetCareer, skillsFilled } = validatedData

    let result
    try {
      result = await recommendationService.predictCareerSpecific(targetCareer, skillsFilled)
    } catch (err) {
      // The original controller handles error like this for this endpoint
      return next(err)
    }

    if (!result || result.status !== 'sukses') {
      return next(new Error('Invalid response from AI service'))
    }

    const saved = await recommendationRepository.createRecommendation({
      targetCareer: targetCareer,
      skillsInput: skillsFilled,
      recommendedCareer: result.rekomendasi_utama,
      confidencePercent: result.tingkat_keyakinan,
      allPredictions: result.detail_matriks
    })

    res.status(200).json({
      status: 'sukses',
      data: {
        id: saved.id,
        target_career: targetCareer,
        rekomendasi_utama: result.rekomendasi_utama,
        tingkat_keyakinan: result.tingkat_keyakinan,
        detail_matriks: result.detail_matriks,
        analisis_dinamis: result.analisis_dinamis || null
      }
    })
  } catch (error) {
    next(error)
  }
}

export const getRecommendationHistory = async (req, res, next) => {
  try {
    const history = await recommendationRepository.getRecommendationHistory()

    res.status(200).json({
      status: 'sukses',
      total: history.length,
      data: history
    })
  } catch (error) {
    next(error)
  }
}
