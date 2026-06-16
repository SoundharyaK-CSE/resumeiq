import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Analysis from './pages/Analysis'
import CoverLetter from './pages/CoverLetter'
import Rewriter from './pages/Rewriter'
import InterviewPrep from './pages/InterviewPrep'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#FAFAF9] flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/cover-letter" element={<CoverLetter />} />
            <Route path="/rewriter" element={<Rewriter />} />
            <Route path="/interview" element={<InterviewPrep />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App