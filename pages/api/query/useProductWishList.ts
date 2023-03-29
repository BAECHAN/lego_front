import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

const useProductWishList = () => {
  const [page, setPage] = useState(0)
  const { data: session } = useSession()

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/product-wish-list?page=${page}&email=${session?.user?.email}`

  return useQuery(
    ['product-wish-list', page],
    async () => {
      const res = await axios.get(url, {
        headers: { 'Content-Type': `application/json; charset=utf-8` },
      })
      return res.data
    },
    {
      onSuccess: (data) => console.log(data),
      onError: (e) => console.log(e),
      enabled: !!session?.user?.email,
    }
  )
}

export default useProductWishList
