import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const pdfParse = require('pdf-parse')

export const extractTextFromPDF = async (buffer) => {
  try {
    const data = await pdfParse(buffer)
    return data.text
  } catch (error) {
    throw new Error('Failed to parse PDF: ' + error.message)
  }
}