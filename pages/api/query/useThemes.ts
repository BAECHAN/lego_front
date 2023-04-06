import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { ThemeT } from 'types'

const useThemes = () => {
  return useQuery<ThemeT[]>(
    ['theme-list'],
    async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/theme-list`
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
