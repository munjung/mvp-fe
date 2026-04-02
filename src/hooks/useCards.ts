import { useQuery } from '@tanstack/react-query'
import { getCards, getCaseList } from '@api/cards'
import type { SelectOption } from '@/types/common'

export const useCards = () => {
  return useQuery({
    queryKey: ['cards'],
    queryFn: getCards,
  })
}

export const useCases = () => {
  const query = useQuery({
    queryKey: ['usecases'],
    queryFn: getCaseList,
  })

  const selectCaseOptions: SelectOption[] = (query.data ?? []).map((usecase) => ({
    label: usecase.name,
    value: String(usecase.id)
  })) 
  
  return {
    ...query,
    selectCaseOptions,
  }
  // return useQuery({
  //   queryKey: ['usecase'],
  //   queryFn: getCaseList,
  // })
}
