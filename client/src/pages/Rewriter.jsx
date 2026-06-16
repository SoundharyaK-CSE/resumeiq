import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useResume } from '../context/ResumeContext'
import { ArrowLeft, Download, PenTool, RefreshCw } from 'lucide-react'
import api from '../utils/api'

const SECTION_HEADERS = ['EDUCATION', 'EXPERIENCE', 'SKILLS', 'PROJECTS', 'CERTIFICATIONS', 'ACHIEVEMENTS', 'SUMMARY', 'WORK AUTHORIZATION', 'TECHNICAL SKILLS', 'NOTABLE PROJECTS']

const isSection = (line) => SECTION_HEADERS.some(h => line.trim().toUpperCase() === h)

const linkify = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+|linkedin\.com\/[^\s]+|github\.com\/[^\s]+)/gi
  const parts = text.split(urlRegex)
  return parts.map((part, i) =>
    urlRegex.test(part)
      ? <a key={i} href={part.startsWith('http') ? part : `https://${part}`} target="_blank" rel="noreferrer" style={{color: '#0000EE', textDecoration: 'underline'}}>{part}</a>
      : part
  )
}

const Rewriter = () => {
  const { resumeText, rewrittenResume, setRewrittenResume } = useResume()
  const [loading, setLoading] = useState(false)
 const [error, setError] = useState(null)
  const [updateRequest, setUpdateRequest] = useState('')
  const [updating, setUpdating] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!resumeText) { navigate('/'); return }
    if (!rewrittenResume) doRewrite()
  }, [])

const handleUpdate = async () => {
    if (!updateRequest.trim()) return
    setUpdating(true)
    try {
      const res = await api.post('/rewriter', { 
        resumeText: rewrittenResume, 
        updateRequest 
      })
      setRewrittenResume(res.data.rewrittenResume)
      setUpdateRequest('')
    } catch (err) {
      setError('Failed to apply updates. Please try again.')
    } finally {
      setUpdating(false)
    }
  }

  const doRewrite = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.post('/rewriter', { resumeText })
      setRewrittenResume(res.data.rewrittenResume)
    } catch (err) {
      setError('Failed to rewrite resume. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const renderPreview = (lines) => {
    const elements = []
    let currentSection = ''
    let contentLineIndex = 0

    lines.forEach((rawLine, i) => {
      const line = rawLine.trim()
      if (!line) { elements.push(<div key={i} style={{height: '8px'}} />); return }

      if (contentLineIndex === 0) {
        elements.push(
          <div key={i} style={{textAlign: 'center', fontWeight: 900, fontSize: '22px', color: '#000', marginBottom: '3px'}}>{line}</div>
        )
        contentLineIndex++
        return
      }

      if (contentLineIndex === 1) {
        elements.push(
          <div key={i} style={{textAlign: 'center', fontWeight: 400, fontSize: '12px', color: '#000', marginBottom: '2px'}}>{linkify(line)}</div>
        )
        contentLineIndex++
        return
      }

      if (contentLineIndex === 2 && (line.includes('linkedin') || line.includes('github') || line.includes('http'))) {
        elements.push(
          <div key={i} style={{textAlign: 'center', fontWeight: 400, fontSize: '12px', color: '#000', marginBottom: '14px'}}>{linkify(line)}</div>
        )
        contentLineIndex++
        return
      }

      contentLineIndex++

      if (isSection(line)) {
        currentSection = line.toUpperCase()
        elements.push(
          <div key={i} style={{marginTop: '16px', marginBottom: '5px'}}>
            <div style={{fontWeight: 900, fontSize: '14px', textTransform: 'uppercase', color: '#000', letterSpacing: '0.8px'}}>{line}</div>
            <div style={{borderTop: '3px solid #000', marginTop: '3px'}} />
          </div>
        )
        return
      }

      if (line.startsWith('-')) {
        elements.push(
          <div key={i} style={{display: 'flex', gap: '6px', marginLeft: '14px', marginBottom: '3px'}}>
            <span style={{fontWeight: 400, fontSize: '12px', color: '#000', flexShrink: 0}}>-</span>
            <span style={{fontWeight: 400, fontSize: '12px', color: '#000', lineHeight: '1.5'}}>{linkify(line.replace(/^-\s*/, ''))}</span>
          </div>
        )
        return
      }

      if (line.includes(':') && currentSection === 'SKILLS') {
        const [label, ...rest] = line.split(':')
        elements.push(
          <div key={i} style={{fontSize: '12px', color: '#000', marginBottom: '3px'}}>
            <span style={{fontWeight: 700}}>{label}:</span>
            <span style={{fontWeight: 400}}>{rest.join(':')}</span>
          </div>
        )
        return
      }

      if (currentSection === 'PROJECTS' && !line.startsWith('-') && !line.includes(':') && line.length < 60) {
        elements.push(
          <div key={i} style={{fontWeight: 800, fontSize: '13px', color: '#000', textDecoration: 'underline', marginTop: '10px', marginBottom: '3px'}}>{line}</div>
        )
        return
      }

      if (currentSection === 'EXPERIENCE' && !line.startsWith('-') && line.length < 80) {
        elements.push(
          <div key={i} style={{fontWeight: 800, fontSize: '13px', color: '#000', marginTop: '8px', marginBottom: '3px'}}>{line}</div>
        )
        return
      }

      elements.push(
        <div key={i} style={{fontWeight: 400, fontSize: '12px', color: '#000', marginBottom: '3px'}}>{linkify(line)}</div>
      )
    })

    return elements
  }

  const handleDownload = () => {
    alert('In the print dialog:\n1. Set "Destination" to Save as PDF\n2. More settings → uncheck "Headers and footers"')

    const lines = rewrittenResume.split('\n')
    let html = ''
    let currentSection = ''
    let contentLineIndex = 0

    const linkifyHtml = (text) => text.replace(
      /(https?:\/\/[^\s]+|linkedin\.com\/[^\s]+|github\.com\/[^\s]+)/gi,
      (url) => {
        const href = url.startsWith('http') ? url : `https://${url}`
        return `<a href="${href}" style="color:#0000EE;text-decoration:underline">${url}</a>`
      }
    )

    lines.forEach((rawLine, i) => {
      const line = rawLine.trim()
      if (!line) { html += '<div style="height:5px"></div>'; return }

      if (contentLineIndex === 0) {
        html += `<div style="text-align:center;font-weight:900;font-size:18pt;margin-bottom:2px">${line}</div>`
        contentLineIndex++
        return
      }

      if (contentLineIndex === 1) {
        html += `<div style="text-align:center;font-size:10pt;font-weight:400;margin-bottom:2px">${linkifyHtml(line)}</div>`
        contentLineIndex++
        return
      }

      if (contentLineIndex === 2 && (line.includes('linkedin') || line.includes('github') || line.includes('http'))) {
        html += `<div style="text-align:center;font-size:10pt;font-weight:400;margin-bottom:12px">${linkifyHtml(line)}</div>`
        contentLineIndex++
        return
      }

      contentLineIndex++

      if (isSection(line)) {
        currentSection = line.toUpperCase()
        html += `
          <div style="margin-top:14px;margin-bottom:4px">
            <div style="font-weight:900;font-size:12pt;text-transform:uppercase;letter-spacing:0.8px;color:#000">${line}</div>
            <div style="border-top:3px solid #000;margin-top:3px;margin-bottom:4px"></div>
          </div>`
        return
      }

      if (line.startsWith('-')) {
        html += `<div style="margin-left:14px;font-size:10pt;font-weight:400;margin-bottom:3px;line-height:1.5">- ${linkifyHtml(line.replace(/^-\s*/, ''))}</div>`
        return
      }

      if (line.includes(':') && currentSection === 'SKILLS') {
        const [label, ...rest] = line.split(':')
        html += `<div style="font-size:10pt;margin-bottom:3px"><span style="font-weight:700">${label}:</span><span style="font-weight:400">${rest.join(':')}</span></div>`
        return
      }

      if (currentSection === 'PROJECTS' && !line.startsWith('-') && !line.includes(':') && line.length < 60) {
        html += `<div style="font-weight:800;font-size:11pt;text-decoration:underline;margin-top:10px;margin-bottom:3px">${line}</div>`
        return
      }

      if (currentSection === 'EXPERIENCE' && !line.startsWith('-') && line.length < 80) {
        html += `<div style="font-weight:800;font-size:11pt;margin-top:8px;margin-bottom:3px">${line}</div>`
        return
      }

      html += `<div style="font-size:10pt;font-weight:400;margin-bottom:3px">${linkifyHtml(line)}</div>`
    })

    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Resume</title>
          <style>
            @page { size: A4; margin: 12mm 15mm 12mm 15mm; }
            @media print { head, header, footer { display: none !important; } }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Calibri', Arial, sans-serif; color: #000; background: #fff; line-height: 1.4; }
          </style>
        </head>
        <body>${html}</body>
        <script>window.onload = function() { window.print(); window.close(); }</script>
      </html>
    `)
    printWindow.document.close()
  }

  if (loading) return (
    <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#9B6FD4] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-600 font-medium">Rewriting your resume...</p>
        <p className="text-slate-400 text-sm mt-1">Optimizing for ATS systems</p>
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

  if (!rewrittenResume) return null

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <div className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/analysis')} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium">
            <ArrowLeft size={16} />
            Back to Analysis
          </button>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-2">
            <div className="bg-[#F0EBF8] p-1.5 rounded-lg">
              <PenTool size={14} className="text-[#9B6FD4]" />
            </div>
            <h1 className="text-slate-800 font-semibold">Resume Rewriter</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={doRewrite} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium transition-all">
            <RefreshCw size={14} />
            Regenerate
          </button>
          <button onClick={handleDownload} className="flex items-center gap-2 bg-[#1a1a2e] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#2d2d44] transition-colors">
            <Download size={14} />
            Download PDF
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-10">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="p-10" style={{fontFamily: 'Calibri, Arial, sans-serif'}}>
            {renderPreview(rewrittenResume.split('\n'))}
          </div>
        </div>
      </div>

      {/* Update Request Box */}
      <div className="max-w-3xl mx-auto px-8 pb-10">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-semibold text-slate-800 mb-1">Want to update your resume?</h3>
          <p className="text-xs text-slate-400 mb-4">Type what you want to change — e.g. "Update CGPA to 9.1, add AWS certification, change location to Chennai"</p>
          <div className="flex gap-3">
            <textarea
              className="flex-1 border border-slate-200 rounded-xl p-3 text-sm text-slate-700 resize-none focus:outline-none focus:border-[#9B6FD4] focus:ring-2 focus:ring-[#F0EBF8] transition-all"
              rows={3}
              placeholder="e.g. Update CGPA to 9.2, add Google Cloud certification, remove water puzzle sort project..."
              value={updateRequest}
              onChange={(e) => setUpdateRequest(e.target.value)}
            />
            <button
              onClick={handleUpdate}
              disabled={updating || !updateRequest.trim()}
              className="bg-[#1a1a2e] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#2d2d44] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 h-fit mt-auto"
            >
              {updating ? 'Updating...' : 'Apply Updates'}
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Rewriter