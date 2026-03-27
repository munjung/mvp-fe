import apiClient from './client'

export const getBrandList = () => apiClient.get('/api/v1/brand')
