import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { UserT } from 'types'
import { useSession } from 'next-auth/react'
import { queryKeys } from './queryKeys'

const useUser = () => {
  const { data: session } = useSession()

  const queryKey = queryKeys.userInfo

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/get-${queryKey}`

  const params = {
    email: session?.user?.email,
  }
  return useQuery<UserT>(
    [queryKey],
    async () => {
      const res = await axios.post(url, JSON.stringify(params), {
        headers: { 'Content-Type': `application/json; charset=utf-8` },
      })
      return res.data.result
    },
    {
      onSuccess: (data) => {},
      onError: (error) => {
        console.log(error)
      },
      enabled: !!session?.user?.email,
    }
  )
}

export default useUser
