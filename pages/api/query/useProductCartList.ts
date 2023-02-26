import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import { selectedOrderSelector } from 'state/atoms'
import { ProductCartT } from 'types'

const useProductCartList = () => {
  const [page, setPage] = useState(0)
  const { data: session } = useSession()

  let url =
    'http://localhost:5000' +
    '/api/product-cart-list?page=' +
    page +
    '&email=' +
    session?.user?.email

  return useQuery(
    ['product-cart-list', page],
    async () => {
      const res = await axios.get(url, {
        headers: { 'Content-Type': `application/json; charset=utf-8` },
      })
      return res.data
    },
    {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (e) => console.log(e),
      enabled: !!session?.user?.email,
    }
  )
}

export default useProductCartList
