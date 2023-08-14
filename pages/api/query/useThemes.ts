import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { queryKeys } from './queryKeys'

const useThemes = () => {
  const queryKey = queryKeys.themeList

  return useQuery(
    [queryKey],
    async () => {
      return await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/${queryKey}`)
    },
    {
      onSuccess: (response) => {
        if (!(response.status === 200)) {
          alert('의도하지 않은 응답입니다.\r고객센터에 문의해주시기 바랍니다.')
          console.error(`HTTP status : ${response?.status}`)
        }
      },
      onError: (error) => console.error(error),
    }
  )
}

export default useThemes
