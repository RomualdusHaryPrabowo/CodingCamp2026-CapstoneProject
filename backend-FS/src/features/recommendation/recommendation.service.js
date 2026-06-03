import axios from 'axios'
import { CAREER_SKILL_MAPPING, ALL_SKILLS } from './recommendation.schema.js'

const MATCHSTEP_AI_URL = process.env.MATCHSTEP_AI_URL || 'http://localhost:8000'

// Data padding logic - convert 6 skills to full 19
const padSkillsData = (selectedCareer, skillsInput) => {
  const careerSkills = CAREER_SKILL_MAPPING[selectedCareer] || []
  const paddedSkills = {}

  for (const skill of careerSkills) {
    paddedSkills[skill] = skillsInput[skill] || 0
  }

  for (const skill of ALL_SKILLS) {
    if (!paddedSkills[skill]) {
      paddedSkills[skill] = 0
    }
  }

  return paddedSkills
}

export const recommendationService = {
  getGeneralRecommendation: async (hardSkills, softSkills) => {
    const aiResponse = await axios.post(`${MATCHSTEP_AI_URL}/predict`, {
      hard_skills: hardSkills,
      soft_skills: softSkills
    }, { timeout: 30000 })

    if (!aiResponse.data) {
      throw new Error('Gagal mendapatkan prediksi dari AI Service')
    }

    return aiResponse.data
  },

  predictCareer: async (hardSkills, softSkills) => {
    try {
      const aiResponse = await axios.post(
        `${MATCHSTEP_AI_URL}/predict`,
        {
          hard_skills: hardSkills,
          soft_skills: softSkills
        },
        { timeout: 30000 }
      )
      return aiResponse.data
    } catch (aiError) {
      console.error('MATCHSTEP AI Error:', aiError.message)
      throw new Error('LAYANAN_AI_TIDAK_TERSEDIA', { cause: aiError })
    }
  },

  predictCareerSpecific: async (targetCareer, skillsFilled) => {
    const paddedData = padSkillsData(targetCareer, skillsFilled)
    
    try {
      const aiResponse = await axios.post(
        `${MATCHSTEP_AI_URL}/api/v1/recommendations/specific`,
        {
          target_career: targetCareer,
          skills_filled: paddedData
        },
        { timeout: 30000 }
      )
      return aiResponse.data
    } catch (aiError) {
      console.error('AI Service Error:', aiError.message)
      throw new Error(`Failed to call AI service: ${aiError.message}`, { cause: aiError })
    }
  }
}
