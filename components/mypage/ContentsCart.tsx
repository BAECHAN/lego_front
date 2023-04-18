import ProductInCart from '@components/ProductInCart'
import { useRouter } from 'next/router'
import useProductCartList from 'pages/api/query/useProductCartList'
import React, { useEffect } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { orderPriceSelector, selectedOrderSelector } from 'state/atoms'
import { ProductCartT } from 'types'

export default function ContentsCart() {
  const router = useRouter()

  const { data, isFetched } = useProductCartList()

  const [selectedOrder, setSelectedOrder] = useRecoilState(
    selectedOrderSelector
  )
  const [totalPrice, setTotalPrice] = useRecoilState(orderPriceSelector)

  const resetSelectredOrder = useResetRecoilState(selectedOrderSelector)
  const resetTotalPrice = useResetRecoilState(orderPriceSelector)

  useEffect(() => {
    if (isFetched) {
      resetSelectredOrder()
      resetTotalPrice()

      data.cartList.map((item: ProductCartT, index: number) => {
        setSelectedOrder((selectedOrder) => [...selectedOrder, item.cart_id])

        let addPrice = 0

        if (item.discounting == 1 && item.rate_discount > 0) {
          addPrice =
            item.price *
            item.order_quantity *
            (1 - Number(item.rate_discount) / 100)
        } else {
          addPrice = item.price * item.order_quantity
        }

        setTotalPrice((totalPrice) => totalPrice + addPrice)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const handleClickOrder = () => {
    router.push('/order')
  }

  const handleClickShopping = () => {
    router.push('/themes')
  }

  return (
    <div>
      {isFetched ? (
        data && data.cartList?.length > 0 ? (
          <div className="min-h-[600px]">
            <ul className="flex flex-col">
              {data.cartList.map((item: ProductCartT, index: number) => {
                return (
                  <li key={item.cart_id}>
                    <ProductInCart product={item} />
                    {index < data.cartList.length - 1 && <hr />}
                  </li>
                )
              })}
            </ul>
            <div className="flex justify-center">
              <p>주문할 상품 : {selectedOrder.length}개</p>
            </div>
            <div className="flex justify-center">
              {totalPrice.toLocaleString('ko-KR')} 원
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                title="선택한 상품들에 한하여 주문하기"
                id="btnOrderRouter"
                className="btn-common min-w-[500px]"
                onClick={handleClickOrder}
              >
                주문하기
              </button>
            </div>
          </div>
        ) : (
          <div className="text-xl">
            <div>해당하는 상품이 없습니다.</div>
            <div className="flex justify-center mt-52">
              <button
                type="button"
                title="쇼핑하러 가기 버튼"
                id="btnShopRouter"
                className="btn-common min-w-[500px]"
                onClick={handleClickShopping}
              >
                쇼핑하러 가기
              </button>
            </div>
          </div>
        )
      ) : null}
    </div>
  )
}
