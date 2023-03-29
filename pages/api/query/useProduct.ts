import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { ProductT } from 'types'

const useProduct = (props: ProductT) => {
  return useQuery(['product-info'], async () => {
    const res = await axios.get(
      `${
        process.env.NEXT_PUBLIC_SERVER_URL
      }/api/product-info?product_number=${Number(props.product_number)}`
    )
    return res.data
  })
}

export default useProduct
