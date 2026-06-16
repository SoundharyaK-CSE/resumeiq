import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useResume } from '../context/ResumeContext'
import { ArrowLeft, CheckCircle, XCircle, Lightbulb, FileText, Mail, PenTool, Mic } from 'lucide-react'
import api from '../utils/api'

const Analysis = () => {
  const { resumeFile, jobDescription, analysisData, setAnalysisData, setResumeText } = useResume()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!resumeFile || !jobDescription) {
      navigate('/')
      return
    }
    if (!analysisData) {
      fetchAnalysis()
    }
  }, [])

  const fetchAnalysis = async () => {
    setLoading(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append('resume', resumeFile)
      formData.append('jobDescription', jobDescription)

      const res = await api.post('/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      setAnalysisData(res.data.data)
      setResumeText(res.data.resumeText)
    } catch (err) {
      setError('Analysis failed. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#4A7FD4] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Analyzing your resume...</p>
          <p className="text-slate-400 text-sm mt-1">This may take a few seconds</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <div className="text-center">
          <XCircle size={48} className="text-red-400 mx-auto mb-4" />
          <p className="text-slate-700 font-medium">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-[#1a1a2e] text-white px-6 py-2 rounded-lg text-sm"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  if (!analysisData) return null

  const { atsScore, matchedSkills, missingSkills, suggestions, summary } = analysisData

  const scoreColor = atsScore >= 70 ? 'text-green-500' : atsScore >= 40 ? 'text-yellow-500' : 'text-red-500'
  const scoreBg = atsScore >= 70 ? 'bg-green-50' : atsScore >= 40 ? 'bg-yellow-50' : 'bg-red-50'
  const scoreBorder = atsScore >= 70 ? 'border-green-200' : atsScore >= 40 ? 'border-yellow-200' : 'border-red-200'

  return (
    <div className="min-h-screen bg-[#FAFAF9]">

      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-8 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>
        <span className="text-slate-300">|</span>
        <h1 className="text-slate-800 font-semibold">Analysis Results</h1>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-10">

        {/* ATS Score + Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* Score Card */}
          <div className={`bg-white rounded-2xl border ${scoreBorder} p-8 text-center shadow-sm`}>
            <p className="text-slate-500 text-sm font-medium mb-2">ATS Score</p>
            <div className={`text-6xl font-bold ${scoreColor} mb-2`}>{atsScore}</div>
            <div className={`text-sm font-medium ${scoreColor}`}>out of 100</div>
            <div className={`${scoreBg} rounded-xl px-3 py-1 text-xs font-medium ${scoreColor} mt-3 inline-block`}>
              {atsScore >= 70 ? 'Strong Match' : atsScore >= 40 ? 'Moderate Match' : 'Weak Match'}
            </div>
          </div>

          {/* Summary */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-[#EAF0FB] p-2 rounded-lg">
                <FileText size={16} className="text-[#4A7FD4]" />
              </div>
              <h2 className="font-semibold text-slate-800">Overall Assessment</h2>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">{summary}</p>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          {/* Matched Skills */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#E8F0E9] p-2 rounded-lg">
                <CheckCircle size={16} className="text-[#4A9D6F]" />
              </div>
              <h2 className="font-semibold text-slate-800">Matched Skills</h2>
              <span className="ml-auto bg-green-50 text-green-600 text-xs font-medium px-2 py-1 rounded-full">
                {matchedSkills.length} found
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {matchedSkills.map((skill, i) => (
                <span key={i} className="bg-[#E8F0E9] text-[#4A9D6F] text-xs font-medium px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-red-50 p-2 rounded-lg">
                <XCircle size={16} className="text-red-400" />
              </div>
              <h2 className="font-semibold text-slate-800">Missing Skills</h2>
              <span className="ml-auto bg-red-50 text-red-400 text-xs font-medium px-2 py-1 rounded-full">
                {missingSkills.length} missing
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {missingSkills.map((skill, i) => (
                <span key={i} className="bg-red-50 text-red-400 text-xs font-medium px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-[#FBF0E8] p-2 rounded-lg">
              <Lightbulb size={16} className="text-[#D47A4A]" />
            </div>
            <h2 className="font-semibold text-slate-800">Suggestions</h2>
          </div>
          <div className="space-y-3">
            {suggestions.map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="bg-[#FBF0E8] text-[#D47A4A] text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-slate-600 text-sm leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/cover-letter')}
            className="bg-white border border-slate-200 rounded-2xl p-6 text-left hover:shadow-md hover:border-[#4A7FD4] transition-all group"
          >
            <div className="bg-[#EAF0FB] w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#4A7FD4] transition-colors">
              <Mail size={18} className="text-[#4A7FD4] group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Cover Letter</h3>
            <p className="text-slate-400 text-xs">Generate a professional cover letter tailored to this job</p>
          </button>

          <button
            onClick={() => navigate('/rewriter')}
            className="bg-white border border-slate-200 rounded-2xl p-6 text-left hover:shadow-md hover:border-[#9B6FD4] transition-all group"
          >
            <div className="bg-[#F0EBF8] w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#9B6FD4] transition-colors">
              <PenTool size={18} className="text-[#9B6FD4] group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Resume Rewriter</h3>
            <p className="text-slate-400 text-xs">Rewrite your resume in clean ATS-friendly format</p>
          </button>

          <button
            onClick={() => navigate('/interview')}
            className="bg-white border border-slate-200 rounded-2xl p-6 text-left hover:shadow-md hover:border-[#4A9D6F] transition-all group"
          >
            <div className="bg-[#E8F0E9] w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#4A9D6F] transition-colors">
              <Mic size={18} className="text-[#4A9D6F] group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">Interview Prep</h3>
            <p className="text-slate-400 text-xs">Get HR, technical and behavioral questions from your resume</p>
          </button>
        </div>

      </div>
    </div>
  )
}

export default Analysis