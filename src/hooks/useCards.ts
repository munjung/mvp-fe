import { useQuery } from '@tanstack/react-query'
import { getCards } from '@api/cards'

export const useCards = () => {
  return useQuery({
    queryKey: ['cards'],
    queryFn: getCards,
  })
}
