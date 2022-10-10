import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'

import { useQuery } from '@tanstack/react-query'
import { ProductT } from 'types'

export async function getServerSideProps(context: any) {
  return {
    props: context.query,
  }
}

export default function Product(props: any) {
  const { data: product } = useQuery<ProductT>(
    ['http://localhost:5000/api/getProductInfo'],
    async () => {
      const res = await fetch(
        `http://localhost:5000/api/getProductInfo?product_number=${Number(
          props.product_number
        )}`
      )
      return res.json()
    },
    {
      onSuccess: (data) => console.log(data),
      onError: (e) => console.log(e),
    }
  )

  return (
    <>
      {product
        ? product.dtl_img_list &&
          product.dtl_img_list.map((img, index) => {
            return (
              <Image
                key={index}
                src={img}
                alt={String(index)}
                width="1600px"
                height="1200px"
                priority
                quality={100}
              />
            )
          })
        : null}
    </>
  )
}

Product.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
