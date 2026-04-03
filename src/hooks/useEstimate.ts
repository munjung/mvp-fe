import { useQuery } from '@tanstack/react-query'
import {
  getBrandList,
  getModelList,
  getDamageList,
  getChatData,
  type ChatParams,
} from '@api/estimate'
import type { SelectOption } from '@/types/common'

// hook에서 데이터를 완성된 형태로 내려줌
export const useBrands = () => {
  const query = useQuery({
    queryKey: ['brands'],
    queryFn: getBrandList,
  })

  const brandOptions: SelectOption[] = (query.data ?? []).map((brand) => ({
    label: brand.name,
    value: String(brand.id),
  }))

  return {
    ...query,
    brandOptions,
  }
}

export const useModels = (id: number) => {
  const query = useQuery({
    queryKey: ['models'],
    queryFn: () => getModelList(id),
    enabled: !!id,
  })

  const modelOptions: SelectOption[] = (query.data ?? []).map((model) => ({
    label: model.name,
    value: String(model.id),
  }))

  return {
    ...query,
    modelOptions,
  }
}

export const useDamages = () => {
  const query = useQuery({
    queryKey: ['damages'],
    queryFn: getDamageList,
  })

  const damageOptions: Record<string, SelectOption[]> = (query.data ?? []).reduce(
    (acc, damage) => {
      acc[damage.category] =
        damage.part?.map((part) => ({
          label: part.name,
          value: String(part.id),
        })) ?? []
      return acc
    },
    {} as Record<string, SelectOption[]>,
  )

  return {
    ...query,
    damageOptions,
  }
}

export const useChats = (params: ChatParams | null) => {
  return useQuery({
    queryKey: ['chats', params],
    queryFn: () => getChatData(params as ChatParams),
    enabled: !!params,
  })
}
