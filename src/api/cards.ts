// ─────────────────────────────────────────────────────────────────────────────
// Cards API
// 백엔드 연결 시 더미 데이터 제거 후 주석 해제
// ─────────────────────────────────────────────────────────────────────────────

import apiClient from './client'

// const BASE = '/api/v1/cards'  // 백엔드 연결 시 주석 해제

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

// ─── API 함수 ─────────────────────────────────────────────────────────────────

// [GET] /api/v1/cards — 카드 목록 조회
export const getCards = async (): Promise<Card[]> => {
  // const { data } = await client.get<Card[]>(BASE)
  // return data
  return DUMMY_CARDS
}

// [GET] UseCase 목록 조회
export const getCaseList = () => apiClient.get('/api/v1/usecase')

// [GET] /api/v1/cards/:id — 카드 상세 조회
// export const getCardById = async (id: number): Promise<Card> => {
//   const { data } = await client.get<Card>(`${BASE}/${id}`)
//   return data
// }

// [POST] /api/v1/cards — 카드 등록
// export const createCard = async (payload: Omit<Card, 'id'>): Promise<Card> => {
//   const { data } = await client.post<Card>(BASE, payload)
//   return data
// }

// [PUT] /api/v1/cards/:id — 카드 수정
// export const updateCard = async (id: number, payload: Partial<Omit<Card, 'id'>>): Promise<Card> => {
//   const { data } = await client.put<Card>(`${BASE}/${id}`, payload)
//   return data
// }

// [DELETE] /api/v1/cards/:id — 카드 삭제
// export const deleteCard = async (id: number): Promise<void> => {
//   await client.delete(`${BASE}/${id}`)
// }
