import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

const useDeliveryShippingList = () => {
  const { data: session } = useSession()

  const queryKey = 'shipping-list'

  const url = 'http://localhost:5000' + '/api/' + queryKey

  return useQuery(
    [queryKey],
    async () => {
      const res = await axios.get(url, {
        params: { email: session?.user?.email },
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

export default useDeliveryShippingList
