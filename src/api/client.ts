import axios from 'axios'
import { useLodingStore } from '@/store/loadingStore'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 응답 구조 { code, message, data } → data만 꺼내줌
// code가 200이 아닌 경우 에러로 처리
apiClient.interceptors.response.use(
  (response) => {
    useLodingStore.getState().decrement()
    const { code, message, data } = response.data ?? {}

    if (code !== undefined && String(code) !== '200') {
      return Promise.reject(new Error(message ?? '요청에 실패했습니다.'))
    }

    if (data !== undefined) {
      response.data = data
    }

    return response
  },
  (error) => {
    useLodingStore.getState().decrement()
    return Promise.reject(error)
  },
)

apiClient.interceptors.request.use((config) => {
  useLodingStore.getState().increment()
  return config
})

export default apiClient
