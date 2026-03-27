import { useQuery } from '@tanstack/react-query'
import { getBrandList, getDamageList } from '@api/estimate'

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
