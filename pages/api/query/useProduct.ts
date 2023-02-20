import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { ProductT } from 'types'

const useProduct = (props: ProductT) => {
  return useQuery<ProductT>(['product-info'], async () => {
    const res = await axios.get(
      `http://localhost:5000/api/product-info?product_number=${Number(
        props.product_number
      )}`
    )
    return res.data
  })
}

export default useProduct
