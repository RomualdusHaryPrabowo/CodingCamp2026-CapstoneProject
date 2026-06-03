import { historyService } from './history.service.js'
import { GetHistorySchema, CreateHistorySchema } from './history.schema.js'

export const getHistoriesByGuestId = async (req, res, next) => {
  try {
    const query = GetHistorySchema.parse(req.query)

    const histories = await historyService.getHistoriesByGuestId(query.guest_id, query.type)

    return res.status(200).json({
      status: 'sukses',
      message: 'Riwayat berhasil diambil',
      data: histories
    })
  } catch (error) {
    // If it's a ZodError, the global errorHandler will catch it and format it as 400
    next(error)
  }
}

export const createHistory = async (req, res, next) => {
  try {
    const body = CreateHistorySchema.parse(req.body)

    // Check manual constraints that were in the original code to ensure strict compatibility
    if (!body.hard_skills || !body.soft_skills) {
      return res.status(400).json({
        status: 'error',
        message: 'Data tidak lengkap. Harap sertakan guest_id, hard_skills, soft_skills, dan prediction_result'
      })
    }

    const history = await historyService.createHistory(body)

    return res.status(201).json({
      status: 'sukses',
      message: 'Riwayat berhasil disimpan',
      data: history
    })
  } catch (error) {
    next(error)
  }
}
