import Layout from '@components/Layout'
import ProductCard from '@components/ProductCard'
import useProductsViewedList from 'pages/api/query/useProductsViewedList'
import React, { useEffect } from 'react'
import { ProductT } from 'types'

export default function ViewedProducts() {
  const { data: data } = useProductsViewedList()

  console.log(data)

  return (
    <div>
      <ul className="flex flex-wrap">
        {data && data.productList.length > 0 ? (
          data.productList?.map((item: ProductT, index: number) => {
            return <ProductCard product={item} key={index} />
          })
        ) : (
          <div className="text-xl">해당하는 상품이 없습니다.</div>
        )}
      </ul>
    </div>
  )
}
ViewedProducts.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
