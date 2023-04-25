import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { ThemeT } from 'types'
import { queryKeys } from './queryKeys'

const useFilters = (props: ThemeT) => {
  const queryKey = queryKeys.productFilter

  return useQuery(
    [queryKey],
    async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${queryKey}?theme_id=${props.theme_id}`
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
