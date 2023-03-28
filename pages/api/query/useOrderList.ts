import axios from 'axios'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

const useOrderList = () => {
  const { data: session } = useSession()

  const queryKey = 'order-list'

  const url = 'http://localhost:5000' + '/api/' + queryKey

  const take = 10

  return useInfiniteQuery(
    [queryKey],
    async ({ pageParam = 0 }) => {
      const res = await axios.get(url, {
        params: {
          email: session?.user?.email,
          page: pageParam,
          take: take,
        },
        headers: { 'Content-Type': `application/json; charset=utf-8` },
      })
      return res.data
    },
    {
      onSuccess: (data) => console.log(data),
      onError: (e) => console.log(e),
      getNextPageParam: (lastPage) => !lastPage.isLast ?? undefined,
      enabled: !!session?.user?.email,
    }
  )
}

export default useOrderList
