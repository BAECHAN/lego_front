import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { ThemeT } from 'types'

const useThemes = () => {
  return useQuery<ThemeT[]>(
    ['getThemeList'],
    async () => {
      const res = await axios.get('http://localhost:5000/api/get-theme-list')
      return res.data
    },
    {
      onSuccess: (data) => console.log(data),
      onError: (e) => console.log(e),
    }
  )
}

export default useThemes
