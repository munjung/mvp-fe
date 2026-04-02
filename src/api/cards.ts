import apiClient from './client'
import type { UseCase, UseCaseDetail } from '@/types/case'

// ─── 타입 ────────────────────────────────────────────────────────────────────

export interface Card {
  id: number
  title: string
  description: string
  tags: string[]
}

// ─── 더미 데이터 (백엔드 연결 후 제거) ──────────────────────────────────────

const DUMMY_CARDS: Card[] = [
  {
    id: 1,
    title: 'AI 자동차 손해사정',
    description:
      '견적 산정 · 과실비율 분석 · 처리방법 제안까지 AI가 의사결정을 지원하는 자동차 손해사정 포탈 (신규 개발 버전)',
    tags: ['태그1', '태그2'],
  },
  {
    id: 2,
    title: '카드 제목 2',
    description: '카드에 대한 간단한 설명을 이곳에 작성합니다.',
    tags: ['태그'],
  },
  {
    id: 3,
    title: '카드 제목 3',
    description: '카드에 대한 간단한 설명을 이곳에 작성합니다.',
    tags: ['태그'],
  },
  {
    id: 4,
    title: '카드 제목 4',
    description: '카드에 대한 간단한 설명을 이곳에 작성합니다.',
    tags: ['태그'],
  },
  {
    id: 5,
    title: '카드 제목 5',
    description: '카드에 대한 간단한 설명을 이곳에 작성합니다.',
    tags: ['태그'],
  },
  {
    id: 6,
    title: '카드 제목 6',
    description: '카드에 대한 간단한 설명을 이곳에 작성합니다.',
    tags: ['태그'],
  },
]

// [GET] /api/v1/cards — 카드 목록 조회 ()
export const getCards = async (): Promise<Card[]> => {
  return DUMMY_CARDS
}

// [GET] UseCase 목록 조회
export const getCaseList = async (): Promise<UseCase[]> => {
  const res = await apiClient.get('/api/v1/usecase')
  console.log('useCase 목록 조회 :: ', res.data)
  return res.data
}

// [GET] UseCase 상세 조회
export const getCaseDetail = async (id: number | string): Promise<UseCaseDetail> => {
  const res = await apiClient.get(`/api/v1/usecase/${id}`)
  return res.data
}
