import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useResume } from '../context/ResumeContext'
import { ArrowLeft, Download, Mail, RefreshCw } from 'lucide-react'
import api from '../utils/api'

const CoverLetter = () => {
  const { resumeText, jobDescription, coverLetterData, setCoverLetterData } = useResume()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!resumeText || !jobDescription) { navigate('/'); return }
    if (!coverLetterData) generateCoverLetter()
  }, [])

  const generateCoverLetter = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.post('/cover-letter', { resumeText, jobDescription })
      setCoverLetterData(res.data.coverLetter)
    } catch (err) {
      setError('Failed to generate cover letter. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    alert('In the print dialog:\n1. Set "Destination" to Save as PDF\n2. More settings → uncheck "Headers and footers"')

    const lines = coverLetterData.split('\n')
    const nameLine = lines[0] || ''
    const contactLine = lines[1] || ''
    const bodyLines = lines.slice(2)

    let bodyHtml = ''
    bodyLines.forEach(line => {
      if (!line.trim()) {
        bodyHtml += '<div style="height:10px"></div>'
      } else {
        bodyHtml += `<div style="font-size:10.5pt;line-height:1.6;margin-bottom:0px;color:#000">${line}</div>`
      }
    })

    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Cover Letter</title>
          <style>
            @page { size: A4; margin: 18mm 20mm 18mm 20mm; }
            @media print { head, header, footer { display: none !important; } }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Calibri', Arial, sans-serif; color: #000; background: #fff; }
          </style>
        </head>
        <body>
          <div style="font-size:26pt;font-weight:900;color:#1a5276;text-transform:uppercase;line-height:1.1;margin-bottom:4px">${nameLine}</div>
          <div style="border-top:3px solid #1a5276;margin-bottom:4px"></div>
          <div style="font-size:9.5pt;color:#333;margin-bottom:20px">${contactLine}</div>
          ${bodyHtml}
        </body>
        <script>window.onload = function() { window.print(); window.close(); }</script>
      </html>
    `)
    printWindow.document.close()
  }

  if (loading) return (
    <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#4A7FD4] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-600 font-medium">Generating your cover letter...</p>
        <p className="text-slate-400 text-sm mt-1">Tailoring it to the job description</p>
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

  if (!coverLetterData) return null

  const lines = coverLetterData.split('\n')
  const nameLine = lines[0] || ''
  const contactLine = lines[1] || ''
  const bodyLines = lines.slice(2)

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/analysis')} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium">
            <ArrowLeft size={16} />
            Back to Analysis
          </button>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-2">
            <div className="bg-[#EAF0FB] p-1.5 rounded-lg">
              <Mail size={14} className="text-[#4A7FD4]" />
            </div>
            <h1 className="text-slate-800 font-semibold">Cover Letter</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={generateCoverLetter} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium transition-all">
            <RefreshCw size={14} />
            Regenerate
          </button>
          <button onClick={handleDownload} className="flex items-center gap-2 bg-[#1a1a2e] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#2d2d44] transition-colors">
            <Download size={14} />
            Download PDF
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="max-w-3xl mx-auto px-8 py-10">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="p-12" style={{fontFamily: 'Calibri, Arial, sans-serif', minHeight: '780px'}}>

            {/* Name */}
            <div style={{fontSize: '28px', fontWeight: 900, color: '#1a5276', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '4px'}}>
              {nameLine}
            </div>

            {/* Blue divider */}
            <div style={{borderTop: '3px solid #1a5276', marginBottom: '4px'}}></div>

            {/* Contact */}
            <div style={{fontSize: '12px', color: '#555', marginBottom: '24px'}}>
              {contactLine}
            </div>

            {/* Body */}
            {bodyLines.map((line, i) => (
              line.trim() === '' ? (
                <div key={i} style={{height: '12px'}} />
              ) : (
                <div key={i} style={{fontSize: '13px', lineHeight: '1.6', color: '#000', marginBottom: '1px'}}>
                  {line}
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoverLetter