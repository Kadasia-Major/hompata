import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

import authRoutes from './routes/authRoutes.js'
import listingRoutes from './routes/listingRoutes.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.get('/api/whatsapp/:id', async (req, res) => {
  try {
    const { executeQuery } = await import('./config/db.js')
    const { id } = req.params
    
    const listings = await executeQuery(
      `SELECT l.*, u.name as landlord_name 
       FROM listings l 
       JOIN users u ON l.landlord_id = u.id 
       WHERE l.id = ? AND l.status = 'active'`,
      [id]
    )
    
    if (listings.length === 0) {
      return res.status(404).json({ message: 'Property not found' })
    }
    
    const property = listings[0]
    const formatPrice = (price) => {
      return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES',
        minimumFractionDigits: 0
      }).format(price)
    }
    
    const message = `Hello, I am interested in this property:
🏠 ${property.title}
💰 ${formatPrice(property.price)}
📍 ${property.area}, ${property.county}
Please provide more details.`

    const whatsappUrl = `https://wa.me/254712345678?text=${encodeURIComponent(message)}`
    
    res.redirect(whatsappUrl)
  } catch (error) {
    console.error('WhatsApp redirect error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

app.use('/api/auth', authRoutes)
app.use('/api/listings', listingRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Hompata API is running' })
})

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use((error, req, res, next) => {
  console.error('Unhandled error:', error)
  res.status(500).json({ message: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`🚀 Hompata Server is running on port ${PORT}`)
  console.log(`📁 Uploads directory: ${path.join(__dirname, 'uploads')}`)
  console.log(`🌐 API Base URL: http://localhost:${PORT}/api`)
})
