import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import analyzeRoute from './routes/analyze.js'
import coverLetterRoute from './routes/coverLetter.js'
import rewriterRoute from './routes/rewriter.js'
import interviewRoute from './routes/interview.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/analyze', analyzeRoute)
app.use('/api/cover-letter', coverLetterRoute)
app.use('/api/rewriter', rewriterRoute)
app.use('/api/interview', interviewRoute)

app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})