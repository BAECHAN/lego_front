import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { ProductT } from 'types'

const useProduct = (props: ProductT) => {
  return useQuery(['product-info'], async () => {
    const res = await axios.get(
      `https://port-0-lego-back-nx562olfs8ljco.sel3.cloudtype.app/api/product-info?product_number=${Number(
        props.product_number
      )}`
    )
    return res.data
  })
}

export default useProduct
