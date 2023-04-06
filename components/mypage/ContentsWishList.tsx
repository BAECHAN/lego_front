import ProductCard from '@components/ProductCard'
import useProductWishList from 'pages/api/query/useProductWishList'
import React from 'react'
import { ProductT } from 'types'

export default function ContentsWishList() {
  const { data, isFetched } = useProductWishList()

  return (
    <div>
      {isFetched ? (
        <ul className="flex flex-wrap">
          {data && data.wishList.length > 0 ? (
            data.wishList?.map((item: ProductT, index: number) => {
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
