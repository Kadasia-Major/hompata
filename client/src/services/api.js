import axios from 'axios'

const API_BASE_URL = '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const searchProperties = async (params = {}) => {
  try {
    const response = await api.get('/listings', { params })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getProperty = async (id) => {
  try {
    const response = await api.get(`/listings/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getUserListings = async () => {
  try {
    const response = await api.get('/user/listings')
    return response.data
  } catch (error) {
    throw error
  }
}

export const createListing = async (listingData) => {
  try {
    const response = await api.post('/listings', listingData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateListing = async (id, listingData) => {
  try {
    const response = await api.put(`/listings/${id}`, listingData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const deleteListing = async (id) => {
  try {
    const response = await api.delete(`/listings/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials)
    return response.data
  } catch (error) {
    throw error
  }
}

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData)
    return response.data
  } catch (error) {
    throw error
  }
}
