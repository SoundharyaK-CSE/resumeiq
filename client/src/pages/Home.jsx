import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, FileText, Briefcase, ArrowRight, CheckCircle } from 'lucide-react'
import { useResume } from '../context/ResumeContext'

const Home = () => {
  const [dragging, setDragging] = useState(false)
  const navigate = useNavigate()
  const { resumeFile, setResumeFile, jobDescription, setJobDescription, setAnalysisData, setCoverLetterData, setRewrittenResume, setInterviewData, setResumeText } = useResume()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf') {
      setResumeFile(file)
    } else {
      alert('Please upload a PDF file only.')
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type === 'application/pdf') {
      setResumeFile(file)
    }
  }

  const handleAnalyze = () => {
    if (!resumeFile) return alert('Please upload your resume.')
    if (!jobDescription.trim()) return alert('Please enter a job description.')
    setAnalysisData(null)
    setCoverLetterData('')
    setRewrittenResume('')
    setInterviewData(null)
    setResumeText('')
    navigate('/analysis')
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">

      {/* Hero Section */}
      <div className="bg-white border-b border-slate-100 py-16 px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#EAF0FB] text-[#4A7FD4] text-sm font-medium px-4 py-2 rounded-full mb-6">
            <CheckCircle size={14} />
            AI-Powered Resume Analysis
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-[#1a1a2e] mb-4 leading-tight">
            Land Your Dream Job with <span className="text-[#4A7FD4]">ResumeIQ</span>
          </h1>
          <p className="text-gray-500 text-lg">
            Upload your resume and job description to get ATS score, skill gap analysis, cover letter, and interview preparation — all in one place.
          </p>
        </div>
      </div>

      {/* Main Upload Section */}
      <div className="max-w-4xl mx-auto px-8 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

          {/* Resume Upload */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#E8F0E9] p-2 rounded-lg">
                <FileText size={18} className="text-[#4A9D6F]" />
              </div>
              <h2 className="font-semibold text-[#1a1a2e]">Upload Resume</h2>
            </div>

            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                dragging ? 'border-[#4A7FD4] bg-[#EAF0FB]' : 'border-slate-200 hover:border-[#4A7FD4] hover:bg-[#EAF0FB]'
              }`}
              onClick={() => document.getElementById('resumeInput').click()}
            >
              <Upload size={28} className="mx-auto mb-3 text-slate-400" />
              {resumeFile ? (
                <div>
                  <p className="text-[#4A9D6F] font-medium">{resumeFile.name}</p>
                  <p className="text-slate-400 text-sm mt-1">Click to change file</p>
                </div>
              ) : (
                <div>
                  <p className="text-slate-600 font-medium">Drag and drop or click to upload</p>
                  <p className="text-slate-400 text-sm mt-1">PDF files only</p>
                </div>
              )}
            </div>
            <input
              id="resumeInput"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Job Description */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#F0EBF8] p-2 rounded-lg">
                <Briefcase size={18} className="text-[#9B6FD4]" />
              </div>
              <h2 className="font-semibold text-[#1a1a2e]">Job Description</h2>
            </div>
            <textarea
              className="w-full h-[172px] border border-slate-200 rounded-xl p-4 text-sm text-slate-700 resize-none focus:outline-none focus:border-[#4A7FD4] focus:ring-2 focus:ring-[#EAF0FB] transition-all"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>
        </div>

        {/* Analyze Button */}
        <div className="text-center">
          <button
            onClick={handleAnalyze}
            className="inline-flex items-center gap-3 bg-[#1a1a2e] text-white px-10 py-4 rounded-xl font-semibold text-base hover:bg-[#2d2d44] transition-all shadow-md hover:shadow-lg"
          >
            Analyze Resume
            <ArrowRight size={18} />
          </button>
          <p className="text-slate-400 text-sm mt-3">Takes less than 10 seconds</p>
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[
            { icon: <FileText size={20} className="text-[#4A7FD4]" />, bg: 'bg-[#EAF0FB]', label: 'ATS Score' },
            { icon: <Briefcase size={20} className="text-[#9B6FD4]" />, bg: 'bg-[#F0EBF8]', label: 'Skill Gap Analysis' },
            { icon: <ArrowRight size={20} className="text-[#4A9D6F]" />, bg: 'bg-[#E8F0E9]', label: 'Cover Letter' },
            { icon: <CheckCircle size={20} className="text-[#D47A4A]" />, bg: 'bg-[#FBF0E8]', label: 'Interview Prep' },
          ].map((f) => (
            <div key={f.label} className="bg-white border border-slate-100 rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className={`${f.bg} w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3`}>
                {f.icon}
              </div>
              <p className="text-sm font-semibold text-slate-700">{f.label}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Home