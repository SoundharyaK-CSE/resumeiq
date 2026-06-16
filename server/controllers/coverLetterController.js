import groq from '../utils/groqClient.js'

export const generateCoverLetter = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body
    if (!resumeText) return res.status(400).json({ error: 'No resume text provided' })
    if (!jobDescription) return res.status(400).json({ error: 'No job description provided' })

    const prompt = `
You are a professional cover letter writer.

Write a formal cover letter based on the resume and job description below.

Resume:
${resumeText}

Job Description:
${jobDescription}

OUTPUT FORMAT — follow this EXACTLY, line by line:

Line 1: Candidate full name only
Line 2: City, State | Phone | Email
Line 3: (blank)
Line 4: Today's date (format: Month DD, YYYY)
Line 5: (blank)
Line 6: Hiring Manager's Name and Title (extract from JD if available, else write "Hiring Manager")
Line 7: Company Name (extract from JD if available, else write "Company")
Line 8: Company Address if available
Line 9: (blank)
Line 10: Dear [Hiring Manager Name or "Hiring Manager"],
Line 11: (blank)
Line 12-end: 3-4 professional paragraphs:
  - Paragraph 1: Express strong interest, mention a key achievement from resume
  - Paragraph 2: Match top skills from resume to job requirements
  - Paragraph 3: Show enthusiasm for the role and company
  - Paragraph 4: Thank them, request interview, express eagerness
Line: (blank)
Line: Thank you for your consideration,
Line: [Candidate Full Name]

RULES:
- Plain text only, no markdown, no asterisks
- Keep under 380 words total
- Use proper line breaks between paragraphs
- Do NOT add any extra labels or section names
`

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.4,
    })

    const coverLetter = completion.choices[0].message.content.trim()
    res.json({ success: true, coverLetter })

  } catch (error) {
    console.error('Cover letter error:', error)
    res.status(500).json({ error: error.message })
  }
}