import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { ProductT } from 'types'

import { queryKeys } from './queryKeys'

const useProduct = (props: ProductT) => {
  const queryKey = queryKeys.productInfo

  return useQuery(
    [queryKey],
    async () => {
      return await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/${queryKey}?product_number=${Number(props.product_number)}`)
    },
    {
      onSuccess: (response) => {
        if (!(response.status === 200)) {
          alert('의도하지 않은 응답입니다.\r고객센터에 문의해주시기 바랍니다.')
          console.error(`HTTP status : ${response?.status}`)
        }
      },
      onError: (e) => console.log(e),
    }
  )
}

export default useProduct
