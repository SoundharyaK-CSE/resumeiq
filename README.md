# ResumeIQ — AI-Powered Resume Analyzer

> A production-grade, full-stack AI web application that helps job seekers optimize their resumes, generate cover letters, and prepare for interviews — all in one place.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Groq](https://img.shields.io/badge/Groq_AI-FF6B35?style=for-the-badge&logo=ai&logoColor=white)

---

## 🌐 Live Demo
| Service | URL |
|---------|-----|
| Frontend | Coming Soon |
| Backend | Coming Soon |

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📊 ATS Score Analysis | Analyze your resume against any job description and get an ATS compatibility score |
| 🎯 Skill Gap Analysis | Instantly see matched and missing skills required for the role |
| 📄 Cover Letter Generator | Generate a professional, tailored cover letter with PDF download |
| ✍️ Resume Rewriter | Rewrite your resume in a clean ATS-friendly format with PDF download |
| 🔄 Resume Editor | Update resume content via natural language — change CGPA, add certifications, etc. |
| 🎤 Interview Prep | Get HR, Technical and Behavioral questions with answering tips and sample answers |

---

## 🛠️ Tech Stack

### Frontend
- React.js + Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React Icons

### Backend
- Node.js + Express.js
- Multer (file upload)
- PDF-parse (resume text extraction)
- Groq SDK

### AI
- Groq API — LLaMA 3.3 70B Versatile

### Deployment
- Frontend → Vercel
- Backend → Render

---

## 📁 Project Structure
resumeiq/
├── client/
│ ├── src/
│ │ ├── components/
│ │ │ └── layout/
│ │ ├── pages/
│ │ ├── context/
│ │ └── utils/
│ └── package.json
│
└── server/
├── controllers/
├── routes/
├── utils/
└── index.js



---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js v18+
- Groq API Key (free at console.groq.com)

### 1. Clone the repository
git clone https://github.com/SoundharyaK-CSE/resumeiq.git
cd resumeiq



### 2. Setup Backend
cd server
npm install


Create a `.env` file in the server folder:
GROQ_API_KEY=your_groq_api_key_here
PORT=5000

npm run dev



### 3. Setup Frontend
cd client
npm install
npm run dev



### 4. Open in browser
http://localhost:5173



---

## 🚀 How It Works

1. Upload your resume (PDF) and paste the job description
2. Click Analyze — AI extracts resume text and scores it against the JD
3. View ATS Score, matched skills, missing skills, and improvement suggestions
4. Generate a Cover Letter tailored to the job with one click
5. Rewrite your resume in a clean, ATS-friendly format
6. Use the Editor to make natural language updates to your resume
7. Get Interview Questions with tips and sample answers tailored to your profile

---

## 👩‍💻 Author

**Soundharya K**
B.E Computer Science and Engineering
RMK Engineering College (2024–2028)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/soundharya-k-3b2206349)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SoundharyaK-CSE)

---

## 📄 License
This project is open source and available under the MIT License.
