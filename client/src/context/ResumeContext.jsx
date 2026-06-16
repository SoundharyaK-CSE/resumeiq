import { createContext, useContext, useState } from 'react'

const ResumeContext = createContext()

export const ResumeProvider = ({ children }) => {
  const [resumeFile, setResumeFile] = useState(null)
  const [jobDescription, setJobDescription] = useState('')
  const [resumeText, setResumeText] = useState('')
  const [analysisData, setAnalysisData] = useState(null)
  const [coverLetterData, setCoverLetterData] = useState('')
  const [rewrittenResume, setRewrittenResume] = useState('')
  const [interviewData, setInterviewData] = useState(null)

  return (
    <ResumeContext.Provider value={{
      resumeFile, setResumeFile,
      jobDescription, setJobDescription,
      resumeText, setResumeText,
      analysisData, setAnalysisData,
      coverLetterData, setCoverLetterData,
      rewrittenResume, setRewrittenResume,
      interviewData, setInterviewData,
    }}>
      {children}
    </ResumeContext.Provider>
  )
}

export const useResume = () => useContext(ResumeContext)