import { useQuery, useMutation } from '@tanstack/react-query'
import { getCards, getCaseList, getCaseDetail, getChatData } from '@api/cards'
import type { SelectOption } from '@/types/common'
import type { UseCaseParam } from '@/types/case'

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
    value: String(usecase.id),
  }))

  return {
    ...query,
    selectCaseOptions,
  }
}

export const useCaseDetail = (id?: number, enabled = true) => {
  return useQuery({
    queryKey: ['caseDetail', id],
    queryFn: () => getCaseDetail(id as number),
    enabled: enabled && !!id,
  })
}

export const useChats = () => {
  return useMutation({
    mutationFn: (params: UseCaseParam) => getChatData(params),
  })
}
