import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { ProductT } from 'types'

const useProducts = (props: ProductT) => {
  return useQuery<ProductT>(['getProductInfo'], async () => {
    const res = await axios.get(
      `http://localhost:5000/api/getProductInfo?product_number=${Number(
        props.product_number
      )}`
    )
    return res.data
  })
}

export default useProducts
