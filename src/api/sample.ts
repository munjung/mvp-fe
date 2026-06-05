import apiClient from './client'

// 샘플 데이터 타입
export interface Sample {
  id: number
  name: string
  description: string
}

// 샘플 생성 요청 타입
export interface CreateSampleRequest {
  name: string
  description: string
}

// [GET] 샘플 목록 조회
export const getSampleList = async (): Promise<Sample[]> => {
  const res = await apiClient.get('/api/v1/sample')
  return res.data
}

// [GET] 샘플 상세 조회
export const getSample = async (id: number): Promise<Sample> => {
  const res = await apiClient.get(`/api/v1/sample/${id}`)
  return res.data
}

// [POST] 샘플 생성
export const createSample = async (payload: CreateSampleRequest): Promise<Sample> => {
  const res = await apiClient.post('/api/v1/sample', payload)
  return res.data
}
