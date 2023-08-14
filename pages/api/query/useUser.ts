import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { UserT } from 'types'

import { queryKeys } from './queryKeys'

const useUser = () => {
  const { data: session } = useSession()

  const queryKey = queryKeys.userInfo

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${queryKey}`

  const params = {
    email: session?.user?.email,
  }
  return useQuery(
    [queryKey],
    async () => {
      return await axios.post(url, JSON.stringify(params), {
        headers: { 'Content-Type': `application/json; charset=utf-8` },
      })
    },
    {
      onSuccess: (response) => {
        if (!(response.status === 200)) {
          alert('의도하지 않은 응답입니다.\r고객센터에 문의해주시기 바랍니다.')
          console.error(`HTTP status : ${response?.status}`)
        }
      },
      onError: (error) => {
        console.log(error)
      },
      enabled: !!session?.user?.email,
    }
  )
}

export default useUser
