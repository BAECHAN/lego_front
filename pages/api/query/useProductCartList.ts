import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

const useProductCartList = () => {
  const [page, setPage] = useState(0)
  const { data: session } = useSession()

  const queryKey = 'product-cart-list'

  const url =
    `${process.env.NEXT_PUBLIC_SERVER_URL}` +
    '/api/' +
    queryKey +
    '?page=' +
    page +
    '&email=' +
    session?.user?.email

  return useQuery(
    [queryKey, page],
    async () => {
      const res = await axios.get(url, {
        headers: { 'Content-Type': `application/json; charset=utf-8` },
      })
      return res.data
    },
    {
      onSuccess: (data) => {},
      onError: (e) => console.log(e),
      enabled: !!session?.user?.email,
    }
  )
}

export default useProductCartList
