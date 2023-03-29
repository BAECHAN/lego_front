import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { UserT } from 'types'
import { useSession } from 'next-auth/react'

const useUser = () => {
  const { data: session } = useSession()

  const queryKey = 'user-info'
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/get-user-info?email=${session?.user?.email}`

  return useQuery<UserT>(
    [queryKey],
    async () => {
      const res = await axios.get(url, {
        headers: { 'Content-Type': `application/json; charset=utf-8` },
      })
      return res.data.result
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

export default useUser
