import { historyRepository } from './history.repository.js'

export const historyService = {
  getHistoriesByGuestId: async (guestId, type) => {
    const whereClause = { guest_id: guestId }
    if (type) {
      whereClause.type = type
    }
    return await historyRepository.findMany(whereClause)
  },

  createHistory: async (data) => {
    return await historyRepository.create({
      guest_id: data.guest_id,
      hard_skill: data.hard_skills,
      soft_skill: data.soft_skills,
      prediction_result: data.prediction_result,
      probability: data.probability || 0,
      type: data.type || 'GENERAL',
      analisis_dinamis: data.analisis_dinamis || null
    })
  }
}
