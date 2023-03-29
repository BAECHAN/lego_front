import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const useProductViewedList = (props: string[]) => {
  const [page, setPage] = useState(0)

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/product-viewed-list?page=${page}`

  return useQuery(
    ['product-viewed-list', page],
    async () => {
      const res = await axios.post(
        url,
        {
          product_number_arr: props,
        },
        {
          headers: { 'Content-Type': `application/json; charset=utf-8` },
        }
      )
      return res.data
    },
    {
      onSuccess: (data) => console.log(data),
      onError: (e) => console.log(e),
      //getNextPageParam: (lastPage) => !lastPage.isLast ?? undefined,
      keepPreviousData: true,
      enabled: props.length > 0,
    }
  )
}

export default useProductViewedList
