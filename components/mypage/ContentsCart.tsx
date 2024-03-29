import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { orderPriceSelector, selectedOrderSelector } from 'state/atoms'
import { ProductCartT } from 'types'

import useProductCartList from 'pages/api/query/useProductCartList'

import useIsMobile from '@components/common/custom/isMobile'
import ProductInCart from '@components/product/ProductInCart'

export default function ContentsCart() {
  const router = useRouter()

  const isMobile = useIsMobile()

  const { data: product, isFetched } = useProductCartList()

  const [selectedOrder, setSelectedOrder] = useRecoilState(selectedOrderSelector)
  const [totalPrice, setTotalPrice] = useRecoilState(orderPriceSelector)

  const resetSelectredOrder = useResetRecoilState(selectedOrderSelector)
  const resetTotalPrice = useResetRecoilState(orderPriceSelector)

  useEffect(() => {
    if (isFetched) {
      resetSelectredOrder()
      resetTotalPrice()

      product?.data.cartList.map((item: ProductCartT, index: number) => {
        setSelectedOrder((selectedOrder) => [...selectedOrder, item.cart_id])

        let addPrice = 0

        if (item.discounting === 1 && item.rate_discount > 0) {
          addPrice = item.price * item.order_quantity * (1 - Number(item.rate_discount) / 100)
        } else {
          addPrice = item.price * item.order_quantity
        }

        setTotalPrice((totalPrice) => totalPrice + addPrice)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  const handleClickOrder = () => {
    selectedOrder.length > 0 ? (isMobile ? router.push('/mobile/order') : router.push('/order')) : alert('상품이미지 왼쪽의 체크박스를 체크하여\r주문할 상품을 선택 후 주문해주시기 바랍니다.')
  }

  return (
    <div>
      {isFetched ? (
        product && product.data.cartList?.length > 0 ? (
          <div className="desktop:min-h-[600px] py-10">
            <ul className="flex flex-col">
              {product.data.cartList.map((item: ProductCartT, index: number) => {
                return (
                  <li key={item.cart_id}>
                    <ProductInCart product={item} />
                    {index < product.data.cartList.length - 1 && <hr />}
                  </li>
                )
              })}
            </ul>
            <div className="flex justify-center">
              <p>주문할 상품 : {selectedOrder.length}개</p>
            </div>
            <div className="flex justify-center">
              <b>{totalPrice.toLocaleString('ko-KR')} 원</b>
            </div>
            <div className="flex justify-center">
              <button type="button" title="선택한 상품들에 한하여 주문하기" id="btnOrderRouter" className="btn-common desktop:min-w-[500px] mobile:w-80" onClick={handleClickOrder}>
                주문하기
              </button>
            </div>
          </div>
        ) : (
          <div className="text-xl">
            <div>해당하는 상품이 없습니다.</div>
            <div className="flex justify-center mt-52">
              <Link href="/themes" passHref>
                <a title="쇼핑하러 가기 버튼" id="btnShopRouter" className="btn-common desktop:min-w-[500px] mobile:w-80">
                  쇼핑하러 가기
                </a>
              </Link>
            </div>
          </div>
        )
      ) : null}
    </div>
  )
}
