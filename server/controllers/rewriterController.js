import groq from '../utils/groqClient.js'

export const rewriteResume = async (req, res) => {
  try {
    const { resumeText, updateRequest } = req.body
    if (!resumeText) return res.status(400).json({ error: 'No resume text provided' })

    const prompt = updateRequest
      ? `
You are a professional resume writer. The resume below has ALREADY been previously edited — preserve ALL existing content and apply ONLY the new requested changes.

Current Resume (already updated — do not reset or remove anything from it):
${resumeText}

User's requested updates:
${updateRequest}

STRICT OUTPUT RULES:
1. Read the user's update request VERY carefully
2. If user says "add X in certificates" — add X ONLY under CERTIFICATIONS section, nowhere else
3. If user says "add X in achievements" — add X ONLY under ACHIEVEMENTS section, nowhere else
4. If user says "add X in skills" — add X ONLY under SKILLS section, nowhere else
5. If user says "add X in projects" — add X ONLY under PROJECTS section, nowhere else
6. If user says "update CGPA to X" — update ONLY the CGPA value under EDUCATION section
7. If user says "change location to X" — update ONLY the location in the contact line
8. Apply ONLY the changes the user requested — do not move or mix content between sections
9. Keep ALL other existing content exactly as it is
10. First line: Candidate's full name ONLY, centered, nothing added
11. Second line: Location | Phone | Email
12. Third line: LinkedIn URL | GitHub URL (if present in resume)
13. Sections in this exact order: EDUCATION, EXPERIENCE, SKILLS, PROJECTS, CERTIFICATIONS, ACHIEVEMENTS
14. Each section title: ALL CAPS on its own line, nothing else
15. CERTIFICATIONS: each cert as "- certification name, issuer"
16. ACHIEVEMENTS: each as "- achievement description"
17. SKILLS: format as "Category: skill1, skill2" one per line
18. PROJECTS: project name on its own line, bullets with "- " for details, GitHub link at end
19. Skip EXPERIENCE section if no experience in resume
20. Output ONLY plain text — no markdown, no asterisks, no bold symbols
21. Keep concise to fit 1 page
22. Separate sections with one blank line
`
      : `
You are a professional resume writer. Rewrite the resume below strictly following the rules.

Resume:
${resumeText}

STRICT OUTPUT RULES:
1. First line: Candidate's full name ONLY — exactly as in resume, centered, nothing added
2. Second line: Location | Phone | Email (all from resume only)
3. Third line: LinkedIn URL | GitHub URL (if present in resume)
4. Then these sections in order: EDUCATION, EXPERIENCE, SKILLS, PROJECTS, CERTIFICATIONS, ACHIEVEMENTS
5. Each section title: ALL CAPS on its own line, nothing else
6. Under SKILLS: format as "Category: skill1, skill2" one per line
7. Under PROJECTS: project name on its own line, then bullets with "- " for details, include full GitHub link at end
8. Under CERTIFICATIONS: each cert as "- certification name, issuer"
9. Under ACHIEVEMENTS: each as "- achievement"
10. DO NOT invent any information not in the resume
11. Skip EXPERIENCE section if no experience in resume
12. Output ONLY plain text — no markdown, no asterisks, no bold symbols
13. Keep concise to fit 1 page
14. Separate sections with one blank line
`

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.1,
      max_tokens: 1500,
    })

    const rewrittenResume = completion.choices[0].message.content.trim()
    res.json({ success: true, rewrittenResume })

  } catch (error) {
    console.error('Rewriter error:', error)
    res.status(500).json({ error: error.message })
  }
}