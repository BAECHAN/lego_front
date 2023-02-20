import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { ThemeT } from 'types'

const useFilters = (props: ThemeT) => {
  return useQuery(
    ['getProductFilter'],
    async () => {
      const res = await axios.get(
        `http://localhost:5000/api/product-filter?theme_id=${props.theme_id}`
      )
      return res.data
    },
    {
      onSuccess: (data) => console.log(data),
      onError: (e) => console.log(e),
    }
  )
}

export default useFilters
