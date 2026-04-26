import express from 'express'
import {
  getAllListings,
  getListingById,
  getUserListings,
  createListing,
  updateListing,
  deleteListing,
  updateListingStatus
} from '../controllers/listingController.js'
import { authenticateToken, requireRole } from '../middleware/authMiddleware.js'
import { upload } from '../middleware/uploadMiddleware.js'

const router = express.Router()

router.get('/', getAllListings)
router.get('/:id', getListingById)

router.get('/user/listings', authenticateToken, getUserListings)
router.post('/', authenticateToken, upload.array('images', 5), createListing)
router.put('/:id', authenticateToken, updateListing)
router.delete('/:id', authenticateToken, deleteListing)

router.patch('/:id/status', authenticateToken, requireRole(['admin']), updateListingStatus)

export default router
