import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

const useDeliveryShippingList = (page?: number) => {
  const { data: session } = useSession()

  const queryKey = 'shipping-list'

  const url = `https://port-0-lego-back-nx562olfs8ljco.sel3.cloudtype.app/api/${queryKey}`

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
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (e) => console.log(e),
      enabled: !!session?.user?.email,
      keepPreviousData: true,
    }
  )
}

export default useDeliveryShippingList
