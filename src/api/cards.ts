import apiClient from './client'
import type { UseCase, UseCaseDetail, UseCaseParam, ChatBlock } from '@/types/case'

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

const CHAT_DATA: ChatBlock[] = [
  {
    id: 0,
    html: `
    <h3>AI 분석 결과</h3>
    `,
  },
  {
    id: 1,
    html: `
      <div style="font-size: 12.5px;"><div style="line-height: 1.75;"><h3 style="color: rgb(15, 23, 42); margin: 13px 0px 5px; font-size: 14.5px; font-weight: 700;">🤖 AI 견적 검증 리포트 — BMW 7시리즈 740i (타사 B차)</h3><div style="height: 4px;"></div><h4 style="color: rgb(8, 145, 178); margin: 11px 0px 3px; font-size: 13px; font-weight: 700;">📋 차량 정보</h4><div style="overflow-x: auto; margin: 8px 0px;"><table style="width: 100%; border-collapse: collapse; font-size: 11px; line-height: 1.5;"><thead><tr style="border-bottom: 2px solid rgb(226, 232, 240);"><th style="text-align: left; padding: 6px 8px; color: rgb(15, 23, 42); font-weight: 700; background: rgb(248, 250, 252); font-size: 10.5px; white-space: nowrap;">항목</th><th style="text-align: left; padding: 6px 8px; color: rgb(15, 23, 42); font-weight: 700; background: rgb(248, 250, 252); font-size: 10.5px; white-space: nowrap;">내용</th></tr></thead><tbody><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(255, 255, 255);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">차종</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;"><strong style="color: rgb(30, 64, 175); font-weight: 700;">BMW 740i xDrive M Sport</strong></td></tr><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(250, 251, 252);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">연식</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">2023년 (약 2년)</td></tr><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(255, 255, 255);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">주행거리</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">약 15,000km</td></tr><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(250, 251, 252);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">차량가액</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">약 <strong style="color: rgb(8, 145, 178); font-weight: 800;">₩85,000,000</strong></td></tr><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(255, 255, 255);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">국산/외산</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;"><strong style="color: rgb(15, 23, 42); font-weight: 700;">외산</strong> (부품 ×1.6 배수 적용)</td></tr></tbody></table></div><div style="height: 4px;"></div><h4 style="color: rgb(8, 145, 178); margin: 11px 0px 3px; font-size: 13px; font-weight: 700;">📊 타사 청구 vs AI 적정 비교</h4><div style="height: 4px;"></div><div style="overflow-x: auto; margin: 8px 0px;"><table style="width: 100%; border-collapse: collapse; font-size: 11px; line-height: 1.5;"><thead><tr style="border-bottom: 2px solid rgb(226, 232, 240);"><th style="text-align: left; padding: 6px 8px; color: rgb(15, 23, 42); font-weight: 700; background: rgb(248, 250, 252); font-size: 10.5px; white-space: nowrap;">파손 부위</th><th style="text-align: left; padding: 6px 8px; color: rgb(15, 23, 42); font-weight: 700; background: rgb(248, 250, 252); font-size: 10.5px; white-space: nowrap;">타사 청구</th><th style="text-align: left; padding: 6px 8px; color: rgb(15, 23, 42); font-weight: 700; background: rgb(248, 250, 252); font-size: 10.5px; white-space: nowrap;">수리방법(타사)</th><th style="text-align: left; padding: 6px 8px; color: rgb(15, 23, 42); font-weight: 700; background: rgb(248, 250, 252); font-size: 10.5px; white-space: nowrap;">AI 적정</th><th style="text-align: left; padding: 6px 8px; color: rgb(15, 23, 42); font-weight: 700; background: rgb(248, 250, 252); font-size: 10.5px; white-space: nowrap;">수리방법(AI)</th><th style="text-align: left; padding: 6px 8px; color: rgb(15, 23, 42); font-weight: 700; background: rgb(248, 250, 252); font-size: 10.5px; white-space: nowrap;"><strong style="color: rgb(15, 23, 42); font-weight: 700;">차이</strong></th></tr></thead><tbody><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(255, 255, 255);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">프론트 범퍼 ASSY</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩3,500,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">교체</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩1,800,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">판금+도장</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;"><strong style="color: rgb(220, 38, 38); font-weight: 800;">▼ ₩1,700,000</strong></td></tr><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(250, 251, 252);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">프론트 범퍼(하/립)</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩1,200,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">교체</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩650,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">판금+도장</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;"><strong style="color: rgb(220, 38, 38); font-weight: 800;">▼ ₩550,000</strong></td></tr><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(255, 255, 255);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">우 프론트 펜더</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩2,200,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">교체</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩1,400,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">판금+도장</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;"><strong style="color: rgb(220, 38, 38); font-weight: 800;">▼ ₩800,000</strong></td></tr><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(250, 251, 252);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">우 헤드라이트(LED)</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩3,200,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">교체</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩3,200,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">교체 ✅</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩0</td></tr><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(255, 255, 255);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">프론트 그릴</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩1,800,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">교체</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩1,200,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">교체</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;"><strong style="color: rgb(220, 38, 38); font-weight: 800;">▼ ₩600,000</strong></td></tr><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(250, 251, 252);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">본넷(후드)</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩2,800,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">교체</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">—</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">판금+도장 *(범퍼에 포함)*</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;"><strong style="color: rgb(220, 38, 38); font-weight: 800;">▼ ₩2,800,000</strong></td></tr><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(255, 255, 255);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">라디에이터+에어컨</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩2,500,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">교체</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩2,500,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">교체 ✅</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩0</td></tr><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(250, 251, 252);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">도장 (4면)</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩3,200,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">—</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩2,100,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">—</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;"><strong style="color: rgb(220, 38, 38); font-weight: 800;">▼ ₩1,100,000</strong></td></tr><tr style="border-bottom: 1px solid rgb(241, 245, 249); background: rgb(255, 255, 255);"><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">공임비</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩4,600,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">—</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">₩2,650,000</td><td style="padding: 5px 8px; color: rgb(71, 85, 105); font-size: 10.5px;">—</td>
    `,
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

// [GET] AI 분석 실행
export const getChatData = async (params: UseCaseParam) => {
  console.log('getChats params :: ', params)
  return CHAT_DATA
}
