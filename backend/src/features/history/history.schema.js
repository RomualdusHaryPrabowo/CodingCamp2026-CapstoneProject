import { z } from 'zod'

export const GetHistorySchema = z.object({
  guest_id: z.string().min(1, 'guest_id diperlukan untuk melihat riwayat'),
  type: z.string().optional()
})

export const CreateHistorySchema = z.object({
  guest_id: z.string().min(1, 'guest_id diperlukan'),
  hard_skills: z.array(z.number()).or(z.record(z.string(), z.number())).optional(), // It can be an array of numbers or object based on usage
  soft_skills: z.array(z.number()).or(z.record(z.string(), z.number())).optional(),
  prediction_result: z.string().min(1, 'prediction_result diperlukan'),
  probability: z.number().optional().default(0),
  type: z.string().optional().default('GENERAL'),
  analisis_dinamis: z.string().optional().nullable()
})
