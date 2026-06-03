import { z } from 'zod'

export const CAREER_SKILL_MAPPING = {
  'Software Development': [
    'Ruby',
    'JavaScript',
    'Rust',
    'Go',
    'Communication',
    'Problem Solving'
  ],
  'Data Science': [
    'Python',
    'Statistics',
    'SQL',
    'Pandas',
    'Analytical Thinking',
    'Communication'
  ],
  'Web Development': [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Creativity',
    'Problem Solving'
  ],
  'DevOps Engineer': [
    'Docker',
    'Kubernetes',
    'Linux',
    'Scripting',
    'Problem Solving',
    'Teamwork'
  ],
  'Machine Learning': [
    'Python',
    'TensorFlow',
    'Statistics',
    'Linear Algebra',
    'Analytical Thinking',
    'Detail Oriented'
  ]
}

export const ALL_SKILLS = [...new Set(Object.values(CAREER_SKILL_MAPPING).flat())]

export const ShortFormInputSchema = z.object({
  targetCareer: z
    .string()
    .min(1, 'target_career tidak boleh kosong')
    .max(100, 'target_career terlalu panjang')
    .refine(
      val => Object.keys(CAREER_SKILL_MAPPING).includes(val),
      val => ({
        message: `Career '${val}' tidak ada dalam CAREER_SKILL_MAPPING. Valid: ${Object.keys(CAREER_SKILL_MAPPING).join(', ')}`
      })
    ),

  skillsFilled: z
    .record(z.string(), z.number().min(0, 'Skill harus >= 0').max(10, 'Skill harus <= 10'))
    .refine(obj => Object.keys(obj).length === 6, {
      message: 'Harus ada tepat 6 skill'
    })
    .superRefine((obj, ctx) => {
      for (const skillName of Object.keys(obj)) {
        if (!ALL_SKILLS.includes(skillName)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Skill '${skillName}' tidak valid. Valid skills: ${ALL_SKILLS.join(', ')}`
          })
        }
      }
    })
})

export const PredictCareerSchema = z.object({
  hard_skills: z.array(z.number().min(0).max(10)).length(14, 'hard_skills harus berupa array dengan 14 elemen'),
  soft_skills: z.array(z.number().min(0).max(10)).length(5, 'soft_skills harus berupa array dengan 5 elemen'),
  guest_id: z.string().optional()
})

export const GeneralRecommendationSchema = z.object({
  guest_id: z.string().optional(),
  hard_skills: z.any().refine(val => val !== undefined, { message: 'Data tidak lengkap. Harap sertakan hard_skills dan soft_skills.' }),
  soft_skills: z.any().refine(val => val !== undefined, { message: 'Data tidak lengkap. Harap sertakan hard_skills dan soft_skills.' })
})
