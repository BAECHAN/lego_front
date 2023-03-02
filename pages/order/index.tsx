import Layout from '@components/Layout'
import useProductCartList from 'pages/api/query/useProductCartList'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { selectedOrderSelector } from 'state/atoms'

export default function Order() {
  let selectedOrder = useRecoilValue(selectedOrderSelector)

  const { data, isFetched, isFetching } = useProductCartList()
  console.log(data)

  console.log(selectedOrder)

  return (
    <div className="min-h-[602px]">
      <ul className="flex flex-col">
        {/* {data && data.cartList?.length > 0 ? (
          data.cartList?.map((item: ProductCartT, index: number) => {
            return (
              <li key={index}>
                <ProductInCart product={item} />
                {index < data.cartList.length - 1 ? <hr /> : null}
              </li>
            )
          })
        ) : (
          <div className="text-xl">해당하는 상품이 없습니다.</div>
        )} */}
      </ul>
      <h2>{selectedOrder}</h2>
    </div>
  )
}
Order.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
