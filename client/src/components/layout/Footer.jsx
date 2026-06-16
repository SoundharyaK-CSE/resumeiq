import { Code2, ExternalLink, Heart } from 'lucide-react'

const Logo = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="white"/>
    <rect x="8" y="7" width="11" height="2" rx="1" fill="#1a1a2e"/>
    <rect x="8" y="11" width="16" height="2" rx="1" fill="#1a1a2e"/>
    <rect x="8" y="15" width="13" height="2" rx="1" fill="#1a1a2e"/>
    <rect x="8" y="19" width="9" height="2" rx="1" fill="#1a1a2e"/>
    <circle cx="23" cy="22" r="5" fill="#4A7FD4"/>
    <path d="M21 22L22.5 23.5L25.5 20.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const Footer = () => {
  return (
    <footer className="bg-[#1a1a2e] mt-auto">
      <div className="max-w-5xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Logo />
              <span className="font-bold text-white text-lg">ResumeIQ</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              AI-powered resume analysis to help you land your dream job faster. Built for students and professionals.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Features</h3>
            <ul className="space-y-3">
              <li className="text-slate-400 text-sm hover:text-white transition-colors cursor-default">ATS Score Analysis</li>
              <li className="text-slate-400 text-sm hover:text-white transition-colors cursor-default">Cover Letter Generator</li>
              <li className="text-slate-400 text-sm hover:text-white transition-colors cursor-default">Resume Rewriter</li>
              <li className="text-slate-400 text-sm hover:text-white transition-colors cursor-default">Interview Prep</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Connect</h3>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => window.open('https://github.com/SoundharyaK-CSE', '_blank')}
                className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm"
              >
                <div className="bg-slate-700 hover:bg-slate-600 p-2 rounded-lg transition-colors">
                  <Code2 size={15} />
                </div>
                GitHub — SoundharyaK-CSE
              </button>
              <button
                onClick={() => window.open('https://linkedin.com/in/soundharya-k-3b2206349', '_blank')}
                className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm"
              >
                <div className="bg-[#EAF0FB] p-2 rounded-lg transition-colors">
                  <ExternalLink size={15} className="text-[#4A7FD4]" />
                </div>
                LinkedIn — Soundharya K
              </button>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs">
            2026 ResumeIQ. Built with React + Node.js + Groq AI
          </p>
          <div className="flex items-center gap-1 text-slate-500 text-xs">
            <span>Made with</span>
            <Heart size={12} className="text-red-400 fill-red-400" />
            <span>by Soundharya K</span>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer