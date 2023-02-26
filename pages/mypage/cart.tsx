import Layout from '@components/Layout'
import ProductInCart from '@components/ProductInCart'
import { useRouter } from 'next/router'
import useProductCartList from 'pages/api/query/useProductCartList'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { orderPriceSelector, selectedOrderSelector } from 'state/atoms'
import { ProductCartT } from 'types'

export default function Cart() {
  const router = useRouter()
  const { data, isFetched } = useProductCartList()
  const [selectedOrder, setSelectedOrder] = useRecoilState(
    selectedOrderSelector
  )

  const totalPrice = useRecoilValue(orderPriceSelector)
  const resetTotalPrice = useResetRecoilState(orderPriceSelector)

  const handleClickRecoilReset = useResetRecoilState(selectedOrderSelector)

  useEffect(() => {
    if (isFetched) {
      handleClickRecoilReset()

      data.cartList.map((item: ProductCartT, index: number) => {
        setSelectedOrder((selectedOrder) => [...selectedOrder, item.cart_id])
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetched])

  const handleClickOrder = () => {
    router.push('/order')
  }

  return (
    <div>
      <ul className="flex flex-col">
        {data && data.cartList?.length > 0 ? (
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
        )}
      </ul>
      <div className="flex justify-center">
        <p>주문할 상품 : {selectedOrder.length}개</p>
      </div>
      <div className="flex justify-center">
        {totalPrice.toLocaleString('ko-KR')} 원
      </div>
      <div className="flex justify-center">
        <button type="button" className="btn-order" onClick={handleClickOrder}>
          주문하기
        </button>
      </div>
      <style jsx>{`
        button.btn-order {
          height: 50px;
          margin-top: 17px;
          box-sizing: border-box;
          outline: 0;
          border: 0;
          cursor: pointer;
          user-select: none;
          vertical-align: middle;
          -webkit-appearance: none;
          font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
          font-weight: 500;
          font-size: 20px;
          letter-spacing: 0.02857em;
          text-transform: uppercase;
          min-width: 500px;
          padding: 6px 16px;
          border-radius: 4px;
          transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
            box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
            border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
            color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
          color: black;
          text-decoration: none;
          background-color: rgb(255, 207, 0);

          :hover {
            background-color: black;
            color: white;
          }
        }
      `}</style>
    </div>
  )
}
Cart.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
