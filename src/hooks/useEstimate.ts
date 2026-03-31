import { useQuery } from '@tanstack/react-query'
import { getBrandList, getDamageList, getChatData } from '@api/estimate'

export const useBrands = () => {
  return useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const res = await getBrandList()
      console.log('제조사 목록 조회 :: ', res.data)
      return res.data
    },
  })
}

export const useDamages = () => {
  return useQuery({
    queryKey: ['damages'],
    queryFn: async () => {
      const res = await getDamageList()
      console.log('파손부위 목록 조회 :: ', res.data)
      return res.data
    },
  })
}

type ChatParams = {
  brandCd: string
  damageCds: string[]
}

export const useChats = (params: ChatParams | null, enabled: boolean) => {
  return useQuery({
    queryKey: ['chats', params],
    queryFn: () => getChatData(params as ChatParams),
    enabled,
  })
}
