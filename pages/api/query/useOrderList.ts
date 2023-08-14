import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'

import { queryKeys } from './queryKeys'

const useOrderList = () => {
  const { data: session } = useSession()
  const take = 10

  const queryKey = queryKeys.orderList

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${queryKey}`

  return useInfiniteQuery(
    [queryKey],
    async ({ pageParam = 0 }) => {
      const param = {
        email: session?.user?.email,
        page: pageParam,
        take: take,
      }

      return await axios.post(url, JSON.stringify(param), {
        headers: { 'Content-Type': `application/json; charset=utf-8` },
      })
    },
    {
      onSuccess: (data) => {},
      onError: (e) => console.log(e),
      getNextPageParam: (lastPage) => !lastPage.data.isLast ?? undefined,
      enabled: !!session?.user?.email,
    }
  )
}

export default useOrderList
