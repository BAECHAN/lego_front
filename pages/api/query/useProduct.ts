import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { ProductT } from 'types'
import { queryKeys } from './queryKeys'

const useProduct = (props: ProductT) => {
  const queryKey = queryKeys.productInfo

  return useQuery([queryKey], async () => {
    const res = await axios.get(
      `${
        process.env.NEXT_PUBLIC_SERVER_URL
      }/api/${queryKey}?product_number=${Number(props.product_number)}`
    )
    return res.data
  })
}

export default useProduct
