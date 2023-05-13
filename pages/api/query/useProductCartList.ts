import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { queryKeys } from './queryKeys'

const useProductCartList = () => {
  const [page, setPage] = useState(0)
  const { data: session } = useSession()

  const queryKey = queryKeys.productCartList

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${queryKey}`

  const param = {
    page: page,
    email: session?.user?.email,
  }

  return useQuery(
    [queryKey, page],
    async () => {
      return await axios.post(url, JSON.stringify(param), {
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
      onError: (e) => console.log(e),
      enabled: !!session?.user?.email,
    }
  )
}

export default useProductCartList
