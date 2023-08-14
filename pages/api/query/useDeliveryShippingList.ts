import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'

import { queryKeys } from './queryKeys'

const useDeliveryShippingList = (page?: number) => {
  const { data: session } = useSession()

  const queryKey = queryKeys.shippingList

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${queryKey}`

  return useQuery(
    [queryKey, page],
    async () => {
      const res = await axios.get(url, {
        params: { email: session?.user?.email, page: page ? page : 1 },
        headers: { 'Content-Type': `application/json; charset=utf-8` },
      })
      return res.data
    },
    {
      onSuccess: (data) => {},
      onError: (e) => console.log(e),
      enabled: !!session?.user?.email,
      keepPreviousData: true,
    }
  )
}

export default useDeliveryShippingList
