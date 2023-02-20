import Layout from '@components/Layout'
import ProductCard from '@components/ProductCard'
import useProductWishList from 'pages/api/query/useProductWishList'
import React from 'react'
import { ProductT } from 'types'

export default function WishList() {
  const { data: data } = useProductWishList()

  return (
    <div>
      <ul className="flex flex-wrap">
        {data && data.productList?.length > 0 ? (
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
WishList.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
