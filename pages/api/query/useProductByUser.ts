import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { ProductByUserT, ProductT } from 'types'
import { useSession } from 'next-auth/react'

const useProductByUser = (props?: ProductT) => {
  const { data: session } = useSession()

  let url = ''
  if (props) {
    url =
      'http://localhost:5000' +
      '/api/product-by-user?product_id=' +
      props.product_id +
      '&email=' +
      session?.user?.email
  }

  return useQuery<ProductByUserT>(
    ['product-by-user', props?.product_id, session?.user?.email],
    async () => {
      const res = await axios.get(url, {
        headers: { 'Content-Type': `application/json; charset=utf-8` },
      })
      return res.data.productByUser
    },
    {
      onSuccess: (data) => console.log(data),
      onError: (e) => console.log(e),
      enabled: !!session?.user?.email && !!props?.product_id,
    }
  )
}

export default useProductByUser
