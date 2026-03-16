
export interface Card {
  id: number
  title: string
  description: string
  tags: string[]
}

const DUMMY_CARDS: Card[] = [
  { id: 1, title: 'AI 자동차 손해사정', description: '견적 산정 · 과실비율 분석 · 처리방법 제안까지 AI가 의사결정을 지원하는 자동차 손해사정 포탈 (신규 개발 버전)', tags: ['태그1', '태그2'] },
  { id: 2, title: '카드 제목 2', description: '카드에 대한 간단한 설명을 이곳에 작성합니다.', tags: ['태그'] },
  { id: 3, title: '카드 제목 3', description: '카드에 대한 간단한 설명을 이곳에 작성합니다.', tags: ['태그'] },
  { id: 4, title: '카드 제목 4', description: '카드에 대한 간단한 설명을 이곳에 작성합니다.', tags: ['태그'] },
  { id: 5, title: '카드 제목 5', description: '카드에 대한 간단한 설명을 이곳에 작성합니다.', tags: ['태그'] },
  { id: 6, title: '카드 제목 6', description: '카드에 대한 간단한 설명을 이곳에 작성합니다.', tags: ['태그'] },
]

// TODO: 백엔드 구축 후 아래 주석 해제, 더미 데이터 제거
export const getCards = async (): Promise<Card[]> => {
  // const { data } = await client.get<Card[]>('/cards')
  // return data
  return DUMMY_CARDS
}
