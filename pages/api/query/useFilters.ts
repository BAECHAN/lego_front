import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { ThemeT } from 'types'

const useFilters = (props: ThemeT) => {
  return useQuery(
    ['product-filter'],
    async () => {
      const res = await axios.get(
        `https://port-0-lego-back-nx562olfs8ljco.sel3.cloudtype.app/api/product-filter?theme_id=${props.theme_id}`
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
