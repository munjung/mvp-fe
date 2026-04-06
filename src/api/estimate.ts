import apiClient from './client'
import type { Brand, Model } from '@/types/brand'
import type { DamageCategory } from '@/types/damage'

// [GET] 제조사 목록 조회
export const getBrandList = async (): Promise<Brand[]> => {
  const res = await apiClient.get('/api/v1/brand')
  console.log('제조사 목록 조회 :: ', res.data)
  return res.data
}

// [GET] 제조사 모델 목록 조회
export const getModelList = async (id: number): Promise<Model[]> => {
  const res = await apiClient.get(`/api/v1/model/${id}`)
  return res.data
}

// [GET] 파손부위 목록 조회
export const getDamageList = async (): Promise<DamageCategory[]> => {
  const res = await apiClient.get('/api/v1/damage')
  console.log('파손부위 목록 조회 :: ', res.data)
  return res.data
}
