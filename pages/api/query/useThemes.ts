import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { ThemeT } from 'types'

const useThemes = () => {
  return useQuery<ThemeT[]>(
    ['theme-list'],
    async () => {
      const res = await axios.get(
        `https://port-0-lego-back-nx562olfs8ljco.sel3.cloudtype.app/api/theme-list`
      )
      return res.data
    },
    {
      onSuccess: (data) => console.log(data),
      onError: (e) => console.log(e),
    }
  )
}

export default useThemes
