import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useResume } from '../context/ResumeContext'
import { ArrowLeft, Mic, ChevronDown, ChevronUp, RefreshCw, Users, Code, Briefcase } from 'lucide-react'
import api from '../utils/api'

const QuestionCard = ({ question, tip, answer, index }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-slate-100 rounded-xl overflow-hidden mb-3 hover:border-slate-300 transition-all">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="bg-slate-100 text-slate-600 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
            {index + 1}
          </span>
          <span className="text-sm font-medium text-slate-800">{question}</span>
        </div>
        {open
          ? <ChevronUp size={16} className="text-slate-400 flex-shrink-0 ml-2" />
          : <ChevronDown size={16} className="text-slate-400 flex-shrink-0 ml-2" />}
      </button>
      {open && (
        <div className="bg-slate-50 border-t border-slate-100">

          {/* Tip */}
          <div className="px-4 pt-4 pb-3 border-b border-slate-100">
            <div className="flex gap-2">
              <div className="bg-[#EAF0FB] p-1.5 rounded-lg flex-shrink-0 h-fit">
                <Mic size={12} className="text-[#4A7FD4]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#4A7FD4] mb-1">HOW TO ANSWER</p>
                <p className="text-xs text-slate-600 leading-relaxed">{tip}</p>
              </div>
            </div>
          </div>

          {/* Sample Answer */}
          <div className="px-4 pt-3 pb-4">
            <div className="flex gap-2">
              <div className="bg-[#E8F0E9] p-1.5 rounded-lg flex-shrink-0 h-fit">
                <Users size={12} className="text-[#4A9D6F]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#4A9D6F] mb-1">SAMPLE ANSWER</p>
                <p className="text-xs text-slate-600 leading-relaxed">{answer}</p>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}

const InterviewPrep = () => {
  const { resumeText, jobDescription, interviewData, setInterviewData } = useResume()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('hr')
  const navigate = useNavigate()
useEffect(() => {
    if (!resumeText) { navigate('/'); return }
    if (!interviewData && !loading) generateQuestions()
  }, [])

  const generateQuestions = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.post('/interview', { resumeText, jobDescription })
      setInterviewData(res.data.data)
    } catch (err) {
      setError('Failed to generate questions. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    {
      key: 'hr',
      label: 'HR Questions',
      icon: <Users size={15} />,
      color: 'text-[#4A7FD4]',
      bg: 'bg-[#EAF0FB]',
      active: 'bg-[#4A7FD4] text-white'
    },
    {
      key: 'technical',
      label: 'Technical Questions',
      icon: <Code size={15} />,
      color: 'text-[#9B6FD4]',
      bg: 'bg-[#F0EBF8]',
      active: 'bg-[#9B6FD4] text-white'
    },
    {
      key: 'behavioral',
      label: 'Behavioral Questions',
      icon: <Briefcase size={15} />,
      color: 'text-[#4A9D6F]',
      bg: 'bg-[#E8F0E9]',
      active: 'bg-[#4A9D6F] text-white'
    },
  ]

  if (loading) return (
    <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#4A9D6F] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-600 font-medium">Generating interview questions...</p>
        <p className="text-slate-400 text-sm mt-1">Tailored from your resume and job description</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
      <div className="text-center">
        <p className="text-slate-700 font-medium mb-4">{error}</p>
        <button onClick={() => navigate('/analysis')} className="bg-[#1a1a2e] text-white px-6 py-2 rounded-lg text-sm">Go Back</button>
      </div>
    </div>
  )

  if (!interviewData) return null

  const currentQuestions = interviewData[activeTab] || []
  const activeTabData = tabs.find(t => t.key === activeTab)

  return (
    <div className="min-h-screen bg-[#FAFAF9]">

      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/analysis')}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back to Analysis
          </button>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-2">
            <div className="bg-[#E8F0E9] p-1.5 rounded-lg">
              <Mic size={14} className="text-[#4A9D6F]" />
            </div>
            <h1 className="text-slate-800 font-semibold">Interview Prep</h1>
          </div>
        </div>
        <button
          onClick={generateQuestions}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium transition-all"
        >
          <RefreshCw size={14} />
          Regenerate
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-10">

        {/* Toggle Buttons */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all shadow-sm ${
                activeTab === tab.key
                  ? tab.active + ' shadow-md'
                  : 'bg-white border border-slate-200 ' + tab.color + ' hover:shadow-md'
              }`}
            >
              {tab.icon}
              {tab.label}
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                activeTab === tab.key
                  ? 'bg-white bg-opacity-20 text-white'
                  : tab.bg + ' ' + tab.color
              }`}>
                {(interviewData[tab.key] || []).length}
              </span>
            </button>
          ))}
        </div>

        {/* Section Info Banner */}
        <div className={`${activeTabData.bg} rounded-xl p-4 mb-6 flex items-center gap-3`}>
          <span className={activeTabData.color}>{activeTabData.icon}</span>
          <div>
            <p className={`font-semibold text-sm ${activeTabData.color}`}>{activeTabData.label}</p>
            <p className="text-xs text-slate-500">
              {currentQuestions.length} questions tailored from your resume — click any question to reveal tip and sample answer
            </p>
          </div>
        </div>

        {/* Questions List */}
        <div>
          {currentQuestions.map((q, i) => (
            <QuestionCard
              key={i}
              question={q.question}
              tip={q.tip}
              answer={q.answer}
              index={i}
            />
          ))}
        </div>

      </div>
    </div>
  )
}

export default InterviewPrep