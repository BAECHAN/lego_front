import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { ThemeT } from 'types'

const useFilters = (props: ThemeT) => {
  return useQuery(
    ['product-filter'],
    async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/product-filter?theme_id=${props.theme_id}`
      )
      return res.data
    },
    {
      onSuccess: (data) => {},
      onError: (e) => console.log(e),
    }
  )
}

export default useFilters
