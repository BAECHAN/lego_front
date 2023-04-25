import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { ThemeT } from 'types'
import { queryKeys } from './queryKeys'

const useThemes = () => {
  const queryKey = queryKeys.themeList

  return useQuery<ThemeT[]>(
    [queryKey],
    async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${queryKey}`
      )
      return res.data
    },
    {
      onSuccess: (data) => {},
      onError: (e) => console.log(e),
    }
  )
}

export default useThemes
