import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

const useProductsWishList = () => {
  const [page, setPage] = useState(0)
  const { data: session } = useSession()

  let url =
    'http://localhost:5000' +
    '/api/product-wish-list?page=' +
    page +
    '&email=' +
    session?.user?.email

  return useQuery(
    ['getProductWishList', page],
    async () => {
      const res = await axios.get(url)
      return res.data
    },
    {
      onSuccess: (data) => console.log(data),
      onError: (e) => console.log(e),
      enabled: !!session?.user?.email,
    }
  )
}

export default useProductsWishList
