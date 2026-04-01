import { useQuery } from '@tanstack/react-query'
import { getCards, getCaseList } from '@api/cards'

export const useCards = () => {
  return useQuery({
    queryKey: ['cards'],
    queryFn: getCards,
  })
}

export const useCases = () => {
  return useQuery({
    queryKey: ['usecase'],
    queryFn: async () => {
      const res = await getCaseList()
      console.log('useCase 목록 조회 :: ', res.data)
      return res.data
    },
  })
}
