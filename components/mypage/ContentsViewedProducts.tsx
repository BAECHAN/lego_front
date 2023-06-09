import ProductCard from '@components/product/ProductCard'
import useProductViewedList from 'pages/api/query/useProductViewedList'
import React, { useEffect } from 'react'
import { ProductT } from 'types'

export default function ContentsViewedProducts() {
  const { data: product, isFetched } = useProductViewedList()

  useEffect(() => {
    if (sessionStorage.getItem('isHistoryBack') === 'true') {
      sessionStorage.removeItem('scrollY')
      sessionStorage.removeItem('isHistoryBack')
    }
  }, [])

  return (
    <div>
      {isFetched ? (
        <ul className="flex flex-wrap min-w-[588px]">
          {product?.data && product.data.productList.length > 0 ? (
            product.data.productList?.map((item: ProductT, index: number) => {
              return <ProductCard product={item} key={index} />
            })
          ) : (
            <div className="text-xl">해당하는 상품이 없습니다.</div>
          )}
        </ul>
      ) : null}
      <p className="text-gray-600 mt-1 text-right">
        ※ 최근 본 상품은 10개 까지만 보여집니다.
      </p>
    </div>
  )
}
