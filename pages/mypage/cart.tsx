import Layout from '@components/Layout'
import ProductInCart from '@components/ProductInCart'
import useProductCartList from 'pages/api/query/useProductCartList'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { orderCountSelector } from 'state/atoms'
import { ProductT } from 'types'

export default function Cart() {
  const { data, isFetched } = useProductCartList()

  const [orderCount, setOrderCount] = useRecoilState(orderCountSelector)

  useEffect(() => {
    isFetched ? setOrderCount(data.cartList.length) : null

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetched])

  return (
    <div>
      <ul className="flex flex-col">
        {data && data.cartList?.length > 0 ? (
          data.cartList?.map((item: ProductT, index: number) => {
            return (
              <>
                <ProductInCart product={item} key={index} />
                {index < data.cartList.length - 1 ? <hr /> : null}
              </>
            )
          })
        ) : (
          <div className="text-xl">해당하는 상품이 없습니다.</div>
        )}
      </ul>
      <div className="flex justify-center">
        <p>주문할 상품 : {orderCount}개</p>
      </div>
      <div className="flex justify-center">
        <button type="button" className="btn-order">
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
