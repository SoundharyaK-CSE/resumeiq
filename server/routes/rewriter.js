import express from 'express'
import { rewriteResume } from '../controllers/rewriterController.js'

const router = express.Router()

router.post('/', rewriteResume)

export default router