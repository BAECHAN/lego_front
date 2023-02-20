import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const useProductsViewedList = (props: string[]) => {
  const [page, setPage] = useState(0)

  let url = 'http://localhost:5000' + '/api/product-viewed-list?page=' + page

  return useQuery(
    ['getProductViewedList', page],
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

export default useProductsViewedList
