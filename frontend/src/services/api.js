import axios from 'axios'
const api = axios.create({ baseURL: 'http://localhost:3000' })

// Customer API
export const getCustomers = () => api.get('/customers')
export const createCustomer = (data) => api.post('/customers', data)
export const deleteCustomer = (id) => api.delete(`/customers/${id}`)

// Offer API
export const getOffers = () => api.get('/offers')
export const createOffer = (data) => api.post('/offers', data)
export const deleteOffer = (id) => api.delete(`/offers/${id}`)
export const updateOfferStatus = (id, status) => api.patch(`/offers/${id}`, { status })

export default api 