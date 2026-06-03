import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

const backendClient = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
})

export const predictCareerAI = async (hardSkills, softSkills, options = {}) => {
  try {
    const response = await backendClient.post('/api/v1/recommendations/predict-career', {
      hard_skills: hardSkills,
      soft_skills: softSkills,
      guest_id: options.guest_id
    })
    return { data: response.data.data }
  } catch (error) {
    if (error.response?.data) {
      throw new Error(error.response.data.message || error.response.data.data?.message || 'Prediction failed', { cause: error })
    }
    throw new Error(error.message || 'Network error', { cause: error })
  }
}

export const saveRecommendation = async (targetCareer, skillsFilled, result) => {
  try {
    const response = await backendClient.post('/api/v1/recommendations/specific', {
      target_career: targetCareer,
      skills_filled: skillsFilled,
      result: result
    })
    return response.data
  } catch (error) {
    if (error.response?.data) {
      throw error.response.data
    }
    throw {
      status: 'error',
      message: error.message
    }
  }
}

export const predictCareer = async (targetCareer, skillsFilled) => {
  try {
    const response = await backendClient.post('/api/v1/recommendations/specific', {
      target_career: targetCareer,
      skills_filled: skillsFilled
    })
    return { data: response.data.data }
  } catch (error) {
    if (error.response?.data) {
      throw new Error(error.response.data.message || 'Prediction failed', { cause: error })
    }
    throw new Error(error.message || 'Network error', { cause: error })
  }
}

export const getHistory = async (guest_id, type = null) => {
  try {
    const params = { guest_id }
    if (type) params.type = type
    
    const response = await backendClient.get('/api/v1/recommendations/history', {
      params
    })
    return response.data
  } catch (error) {
    if (error.response?.data) {
      throw error.response.data
    }
    throw {
      status: 'error',
      message: error.message
    }
  }
}

