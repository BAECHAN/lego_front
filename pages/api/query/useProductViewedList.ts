import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from './queryKeys'
import qs from 'qs'

const useProductViewedList = () => {
  const queryKey = queryKeys.productViewedList

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${queryKey}`

  let viewedProductsJSON: string[] = []

  if (typeof window !== 'undefined') {
    viewedProductsJSON = JSON.parse(
      localStorage.getItem('viewed_products') as string
    )
  }

  const params = {
    product_number_arr: viewedProductsJSON,
  }

  return useQuery(
    [queryKey],
    async () => {
      const res = await axios.get(url, {
        params,
        paramsSerializer: function (params) {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        },
        headers: { 'Content-Type': `application/json; charset=utf-8` },
      })
      return res.data
    },
    {
      onSuccess: (data) => {},
      onError: (e) => console.log(e),
      keepPreviousData: true,
    }
  )
}

export default useProductViewedList
