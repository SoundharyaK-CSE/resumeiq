import axios from 'axios'

const api = axios.create({
  baseURL: 'https://resumeiq-backend-artu.onrender.com/api',
})

export default api