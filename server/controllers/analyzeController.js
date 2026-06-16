import { extractTextFromPDF } from '../utils/pdfParser.js'
import groq from '../utils/groqClient.js'

export const analyzeResume = async (req, res) => {
  try {
    const { jobDescription } = req.body

    if (!req.file) return res.status(400).json({ error: 'No resume file uploaded' })
    if (!jobDescription) return res.status(400).json({ error: 'No job description provided' })

    // Extract text from PDF
    const resumeText = await extractTextFromPDF(req.file.buffer)

    // Send to Groq
    const prompt = `
You are an expert ATS (Applicant Tracking System) analyzer.

Analyze the following resume against the job description and return ONLY a valid JSON object with no extra text, no markdown, no backticks.

Resume:
${resumeText}

Job Description:
${jobDescription}

Return this exact JSON structure:
{
  "atsScore": <number between 0-100>,
  "matchedSkills": [<list of skills found in both resume and JD>],
  "missingSkills": [<list of skills in JD but not in resume>],
  "suggestions": [<list of 4-5 specific improvement suggestions>],
  "summary": "<2-3 sentence overall assessment>"
}
`

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
     model: "llama-3.3-70b-versatile",
      temperature: 0.3,
    })

    const raw = completion.choices[0].message.content.trim()
    const data = JSON.parse(raw)

    res.json({ success: true, data, resumeText })

  } catch (error) {
    console.error('Analyze error:', error)
    res.status(500).json({ error: error.message })
  }
}