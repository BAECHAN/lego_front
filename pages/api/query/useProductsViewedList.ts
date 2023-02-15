import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'

const useProductsList = () => {
  const [page, setPage] = useState(0)
  // let viewedProductsArr: string[] = [];

  // useEffect(()=>{
  //   const viewedProductsJSON:string | null = localStorage.getItem('viewed_products');
  //   if(viewedProductsJSON){
  //     viewedProductsArr = JSON.parse(viewedProductsJSON)
  //   }
  // })

  const [viewedProductsArr, setViewedProductsArr] = useState([])
  const viewedRef = useRef(viewedProductsArr)

  useEffect(() => {
    const viewedProductsJSON: string | null =
      localStorage.getItem('viewed_products')
    if (viewedProductsJSON) {
      viewedRef.current = JSON.parse(viewedProductsJSON)
    } else {
    }
  }, [viewedProductsArr])

  let url = 'http://localhost:5000' + '/api/getProductViewedList?page=' + page

  return useQuery(
    ['getProductViewedList', page],
    async () => {
      const res = await axios.post(
        url,
        {
          product_number_arr: viewedProductsArr,
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
    }
  )
}

export default useProductsList
