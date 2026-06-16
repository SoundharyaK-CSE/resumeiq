import { Link } from 'react-router-dom'

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#1a1a2e"/>
    <rect x="8" y="7" width="11" height="2" rx="1" fill="white"/>
    <rect x="8" y="11" width="16" height="2" rx="1" fill="white"/>
    <rect x="8" y="15" width="13" height="2" rx="1" fill="white"/>
    <rect x="8" y="19" width="9" height="2" rx="1" fill="white"/>
    <circle cx="23" cy="22" r="5" fill="#4A7FD4"/>
    <path d="M21 22L22.5 23.5L25.5 20.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <Link to="/" className="flex items-center gap-2.5">
        <Logo />
        <span className="text-slate-900 font-bold text-xl tracking-tight">ResumeIQ</span>
      </Link>
    </nav>
  )
}

export default Navbar