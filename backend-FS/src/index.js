import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import recommendationRoutes from './features/recommendation/recommendation.routes.js'
import historyRoutes from './features/history/history.routes.js'
import discussionRoutes from './features/discussion/discussion.routes.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()
const PORT = process.env.PORT || 8000
const AI_URL = process.env.MATCHSTEP_AI_URL || 'http://localhost:8000'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Function to check AI service status
const checkAIServiceStatus = async () => {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000)
    
    const response = await fetch(`${AI_URL}/`, { signal: controller.signal })
    clearTimeout(timeoutId)
    return response.ok ? 'running' : 'error'
  } catch {
    return 'offline'
  }
}


const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
  : ['http://localhost:5173']

app.use(
  cors({
    origin: corsOrigins
  })
)
app.use(express.json())

app.use('/api/v1/recommendations', recommendationRoutes)
app.use('/api/v1', historyRoutes)
app.use('/api/v1/discussions', discussionRoutes)


app.get('/', async (req, res) => {
  const aiStatus = await checkAIServiceStatus()
  res.json({
    status: 'success',
    message: 'Backend server is connected and running',
    services: {
      backend: 'running',
      ai: aiStatus
    },
    timestamp: new Date().toISOString()
  })
})

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})


app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    error: 'NOT_FOUND',
    message: `Route ${req.method} ${req.path} not found`
  })
})


app.use(errorHandler)

// For local development
if (process.env.NODE_ENV !== 'production') {
  const server = app.listen(PORT, () => {
    console.log(`✅ Backend server running on http://localhost:${PORT}`)
    console.log(`📊 Prisma Studio: npm run prisma:studio`)
  })

  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...')
    server.close(() => {
      console.log('✅ Server closed')
      process.exit(0)
    })
  })
}

// Export for Vercel serverless
export default app
