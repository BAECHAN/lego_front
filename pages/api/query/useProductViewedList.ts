import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { queryKeys } from './queryKeys'

const useProductViewedList = () => {
  const [page, setPage] = useState(0)

  const queryKey = queryKeys.productViewedList

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${queryKey}?page=${page}`

  let viewedProductsJSON: string[] = []

  if (typeof window !== 'undefined') {
    const viewedProducts = localStorage.getItem('viewed_products')
    if (viewedProducts) {
      viewedProductsJSON = JSON.parse(viewedProducts)
    }
  }

  return useQuery(
    [queryKey, page],
    async () => {
      const res = await axios.post(
        url,
        {
          product_number_arr: viewedProductsJSON,
        },
        {
          headers: { 'Content-Type': `application/json; charset=utf-8` },
        }
      )
      return res.data
    },
    {
      onSuccess: (data) => {},
      onError: (e) => console.log(e),
      //getNextPageParam: (lastPage) => !lastPage.isLast ?? undefined,
      keepPreviousData: true,
      enabled: viewedProductsJSON.length > 0,
    }
  )
}

export default useProductViewedList
