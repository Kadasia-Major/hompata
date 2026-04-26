import { executeQuery } from '../config/db.js'

export const getAllListings = async (req, res) => {
  try {
    const { searchTerm, type, bedrooms, minPrice, maxPrice } = req.query
    
    let query = `
      SELECT l.*, u.name as landlord_name, 
             (SELECT CONCAT('[', GROUP_CONCAT(JSON_OBJECT('image_url', i.image_url)), ']') 
              FROM images i WHERE i.listing_id = l.id) as images
      FROM listings l
      JOIN users u ON l.landlord_id = u.id
      WHERE l.status = 'active'
    `
    
    const params = []
    
    if (searchTerm) {
      query += ` AND (l.title LIKE ? OR l.area LIKE ? OR l.sublocation LIKE ? OR l.county LIKE ?)`
      const searchPattern = `%${searchTerm}%`
      params.push(searchPattern, searchPattern, searchPattern, searchPattern)
    }
    
    if (type && type !== 'all') {
      query += ` AND l.type = ?`
      params.push(type)
    }
    
    if (bedrooms && bedrooms !== 'all') {
      query += ` AND l.bedrooms = ?`
      params.push(bedrooms)
    }
    
    if (minPrice) {
      query += ` AND l.price >= ?`
      params.push(minPrice)
    }
    
    if (maxPrice) {
      query += ` AND l.price <= ?`
      params.push(maxPrice)
    }
    
    query += ` ORDER BY l.created_at DESC`
    
    const listings = await executeQuery(query, params)
    
    listings.forEach(listing => {
      if (listing.images && listing.images.startsWith('[{')) {
        try {
          listing.images = JSON.parse(listing.images)
        } catch (e) {
          listing.images = []
        }
      } else {
        listing.images = []
      }
    })
    
    res.json(listings)
  } catch (error) {
    console.error('Error fetching listings:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getListingById = async (req, res) => {
  try {
    const { id } = req.params
    
    const query = `
      SELECT l.*, u.name as landlord_name, u.email as landlord_email,
             (SELECT JSON_ARRAYAGG(JSON_OBJECT('image_url', i.image_url)) 
              FROM images i WHERE i.listing_id = l.id) as images
      FROM listings l
      JOIN users u ON l.landlord_id = u.id
      WHERE l.id = ? AND l.status = 'active'
    `
    
    const listings = await executeQuery(query, [id])
    
    if (listings.length === 0) {
      return res.status(404).json({ message: 'Property not found' })
    }
    
    const listing = listings[0]
    
    if (listing.images && listing.images.startsWith('[{')) {
      try {
        listing.images = JSON.parse(listing.images)
      } catch (e) {
        listing.images = []
      }
    } else {
      listing.images = []
    }
    
    res.json(listing)
  } catch (error) {
    console.error('Error fetching listing:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getUserListings = async (req, res) => {
  try {
    const userId = req.user.id
    
    const query = `
      SELECT l.*, 
             (SELECT JSON_ARRAYAGG(JSON_OBJECT('image_url', i.image_url)) 
              FROM images i WHERE i.listing_id = l.id) as images
      FROM listings l
      WHERE l.landlord_id = ?
      ORDER BY l.created_at DESC
    `
    
    const listings = await executeQuery(query, [userId])
    
    listings.forEach(listing => {
      if (listing.images && listing.images.startsWith('[{')) {
        try {
          listing.images = JSON.parse(listing.images)
        } catch (e) {
          listing.images = []
        }
      } else {
        listing.images = []
      }
    })
    
    res.json(listings)
  } catch (error) {
    console.error('Error fetching user listings:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const createListing = async (req, res) => {
  try {
    const userId = req.user.id
    const { title, description, price, type, bedrooms, county, area, sublocation } = req.body
    
    if (!title || !price || !type || !bedrooms || !county || !area) {
      return res.status(400).json({ message: 'Required fields are missing' })
    }
    
    const result = await executeQuery(
      `INSERT INTO listings (title, description, price, type, bedrooms, county, area, sublocation, landlord_id, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')`,
      [title, description, price, type, bedrooms, county, area, sublocation, userId]
    )
    
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        await executeQuery(
          'INSERT INTO images (listing_id, image_url) VALUES (?, ?)',
          [result.insertId, `/uploads/${file.filename}`]
        )
      }
    }
    
    res.status(201).json({
      message: 'Property listed successfully',
      listingId: result.insertId
    })
  } catch (error) {
    console.error('Error creating listing:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateListing = async (req, res) => {
  try {
    const userId = req.user.id
    const { id } = req.params
    const { title, description, price, type, bedrooms, county, area, sublocation, status } = req.body
    
    const listings = await executeQuery(
      'SELECT landlord_id FROM listings WHERE id = ?',
      [id]
    )
    
    if (listings.length === 0) {
      return res.status(404).json({ message: 'Property not found' })
    }
    
    if (listings[0].landlord_id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this property' })
    }
    
    await executeQuery(
      `UPDATE listings SET 
       title = ?, description = ?, price = ?, type = ?, bedrooms = ?, 
       county = ?, area = ?, sublocation = ?, status = ?
       WHERE id = ?`,
      [title, description, price, type, bedrooms, county, area, sublocation, status, id]
    )
    
    res.json({ message: 'Property updated successfully' })
  } catch (error) {
    console.error('Error updating listing:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const deleteListing = async (req, res) => {
  try {
    const userId = req.user.id
    const { id } = req.params
    
    const listings = await executeQuery(
      'SELECT landlord_id FROM listings WHERE id = ?',
      [id]
    )
    
    if (listings.length === 0) {
      return res.status(404).json({ message: 'Property not found' })
    }
    
    if (listings[0].landlord_id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this property' })
    }
    
    await executeQuery(
      'DELETE FROM images WHERE listing_id = ?',
      [id]
    )
    
    await executeQuery(
      'DELETE FROM listings WHERE id = ?',
      [id]
    )
    
    res.json({ message: 'Property deleted successfully' })
  } catch (error) {
    console.error('Error deleting listing:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateListingStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    
    if (!['active', 'declined', 'deleted'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' })
    }
    
    const listings = await executeQuery(
      'SELECT id FROM listings WHERE id = ?',
      [id]
    )
    
    if (listings.length === 0) {
      return res.status(404).json({ message: 'Property not found' })
    }
    
    await executeQuery(
      'UPDATE listings SET status = ? WHERE id = ?',
      [status, id]
    )
    
    res.json({ message: `Property status updated to ${status}` })
  } catch (error) {
    console.error('Error updating listing status:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
