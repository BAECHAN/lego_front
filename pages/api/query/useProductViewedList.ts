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
      return await axios.get(url, {
        params,
        paramsSerializer: function (params) {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        },
        headers: { 'Content-Type': `application/json; charset=utf-8` },
      })
    },
    {
      onSuccess: (response) => {
        if (!(response.status === 200)) {
          alert('의도하지 않은 응답입니다.\r고객센터에 문의해주시기 바랍니다.')
          console.error(`HTTP status : ${response?.status}`)
        }
      },
      onError: (e) => console.log(e),
      keepPreviousData: true,
    }
  )
}

export default useProductViewedList
