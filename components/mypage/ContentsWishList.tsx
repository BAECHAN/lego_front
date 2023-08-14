import React from 'react'
import { ProductT } from 'types'

import useProductWishList from 'pages/api/query/useProductWishList'

import ProductCard from '@components/product/ProductCard'

export default function ContentsWishList() {
  const { data: product, isFetched } = useProductWishList()

  return (
    <div>
      {isFetched ? (
        <ul className="flex flex-wrap desktop:min-w-[588px]">
          {product?.data && product.data.wishList.length > 0 ? (
            product.data.wishList?.map((item: ProductT, index: number) => {
              return <ProductCard product={item} key={index} />
            })
          ) : (
            <div className="text-xl">해당하는 상품이 없습니다.</div>
          )}
        </ul>
      ) : null}
    </div>
  )
}
