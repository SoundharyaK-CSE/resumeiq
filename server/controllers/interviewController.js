import groq from '../utils/groqClient.js'

export const generateInterviewQuestions = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body
    if (!resumeText) return res.status(400).json({ error: 'No resume text provided' })

    const prompt = `
You are a senior interviewer at a top tech company conducting a real interview.

Based on this resume and job description, generate interview questions exactly like a real interviewer would ask — conversational, specific to the candidate's experience, projects, and skills.

Resume:
${resumeText}

Job Description:
${jobDescription}

Return ONLY a valid JSON object, no markdown, no backticks.

{
  "hr": [
    { 
      "question": "<question referencing candidate's actual background>", 
      "tip": "<how to answer this specifically>",
      "answer": "<a complete sample answer written in first person, specific to this candidate's actual resume — 3-4 sentences>"
    }
  ],
  "technical": [
    { 
      "question": "<technical question based on their actual skills/projects>", 
      "tip": "<specific answering tip>",
      "answer": "<a complete sample answer written in first person, referencing their actual projects and tech stack — 3-4 sentences>"
    }
  ],
  "behavioral": [
    { 
      "question": "<behavioral question referencing their actual experience>", 
      "tip": "<STAR method tip specific to their background>",
      "answer": "<a complete STAR format answer using their actual experience from resume — 4-5 sentences>"
    }
  ]
}

RULES:
- Generate exactly 7 questions per category (21 total)
- Questions must reference the candidate's ACTUAL projects, skills, and experience
- Answers must be written in FIRST PERSON as if the candidate is speaking
- Answers must reference their ACTUAL project names, technologies, and achievements
- HR: background, motivation, goals, strengths, weaknesses, culture fit
- Technical: their actual tech stack, specific implementations, problem solving
- Behavioral: STAR format using their actual experience
- Sound like a real human interviewer
`

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.5,
      max_tokens: 6000,
    })

    const raw = completion.choices[0].message.content.trim()
    const cleaned = raw.replace(/```json|```/g, '').trim()
    const data = JSON.parse(cleaned)
    res.json({ success: true, data })

  } catch (error) {
    console.error('Interview error:', error)
    res.status(500).json({ error: error.message })
  }
}