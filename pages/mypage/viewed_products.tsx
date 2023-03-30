import Layout from '@components/Layout'
import ProductCard from '@components/ProductCard'
import useProductViewedList from 'pages/api/query/useProductViewedList'
import React, { useEffect, useRef } from 'react'
import { ProductT } from 'types'

export default function ViewedProducts() {
  const { data: data } = useProductViewedList()

  useEffect(() => {
    if (sessionStorage.getItem('isHistoryBack') === 'true') {
      sessionStorage.removeItem('scrollY')
      sessionStorage.removeItem('isHistoryBack')
    }
  }, [])

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
