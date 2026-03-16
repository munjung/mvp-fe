
export interface Card {
  id: number
  title: string
  description: string
  tag: string
}

const DUMMY_CARDS: Card[] = [
  { id: 1, title: '카드 제목 1', description: '카드에 대한 간단한 설명을 이곳에 작성합니다.', tag: '태그' },
  { id: 2, title: '카드 제목 2', description: '카드에 대한 간단한 설명을 이곳에 작성합니다.', tag: '태그' },
  { id: 3, title: '카드 제목 3', description: '카드에 대한 간단한 설명을 이곳에 작성합니다.', tag: '태그' },
  { id: 4, title: '카드 제목 4', description: '카드에 대한 간단한 설명을 이곳에 작성합니다.', tag: '태그' },
  { id: 5, title: '카드 제목 5', description: '카드에 대한 간단한 설명을 이곳에 작성합니다.', tag: '태그' },
  { id: 6, title: '카드 제목 6', description: '카드에 대한 간단한 설명을 이곳에 작성합니다.', tag: '태그' },
]

// TODO: 백엔드 구축 후 아래 주석 해제, 더미 데이터 제거
export const getCards = async (): Promise<Card[]> => {
  // const { data } = await client.get<Card[]>('/cards')
  // return data
  return DUMMY_CARDS
}
