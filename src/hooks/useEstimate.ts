import { useQuery } from '@tanstack/react-query'
import { getBrandList } from '@api/estimate'

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
