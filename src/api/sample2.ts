import apiClient from './client'

// 샘플2 데이터 타입
export interface Sample2 {
  id: number
  title: string
  content: string
}

// 샘플2 생성 요청 타입
export interface CreateSample2Request {
  title: string
  content: string
}

// 샘플2 수정 요청 타입
export interface UpdateSample2Request {
  title: string
  content: string
}

// [GET] 샘플2 목록 조회
export const getSample2List = async (): Promise<Sample2[]> => {
  const res = await apiClient.get('/api/v1/sample2')
  return res.data
}

// [GET] 샘플2 상세 조회
export const getSample2 = async (id: number): Promise<Sample2> => {
  const res = await apiClient.get(`/api/v1/sample2/${id}`)
  return res.data
}

// [POST] 샘플2 생성
export const createSample2 = async (payload: CreateSample2Request): Promise<Sample2> => {
  const res = await apiClient.post('/api/v1/sample2', payload)
  return res.data
}

// [PUT] 샘플2 수정
export const updateSample2 = async (
  id: number,
  payload: UpdateSample2Request
): Promise<Sample2> => {
  const res = await apiClient.put(`/api/v1/sample2/${id}`, payload)
  return res.data
}

// [DELETE] 샘플2 삭제
export const deleteSample2 = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/v1/sample2/${id}`)
}
