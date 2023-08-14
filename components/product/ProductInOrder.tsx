import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ProductCartT } from 'types'

import ProductCartImage from './cart/ProductImage'

export default function ProductInOrder(props: { product: ProductCartT }) {
  return (
    <div className="product-in-order w-full flex justify-start items-center">
      <ProductCartImage product={props.product} />
      <div className="product-in-order-content flex content-around">
        <Link href={`/products/${props.product.product_number}?title=${props.product.title}`} passHref>
          <a className="prod-title">{props.product.title}</a>
        </Link>
      </div>
      <div className="flex-grow"></div>
      <div className="w-1/12">
        <div title="주문할 상품 수량">{props.product.order_quantity} 개</div>
      </div>
      <div className="text-center w-2/12">
        <p>택배배송</p>
        <p className="font-semibold">배송비 무료</p>
      </div>
      <div title="상품에 대한 주문할 금액" className="w-1/12 text-right">
        {props.product.discounting === 1 && props.product.rate_discount > 0 ? (
          <>
            <b className="product-price">{`${(props.product.price * props.product.order_quantity * (1 - Number(props.product.rate_discount) / 100)).toLocaleString('ko-KR')}`}</b>
            <b> 원</b>
          </>
        ) : (
          <>
            <b className="product-price">{`${(props.product.price * props.product.order_quantity).toLocaleString('ko-KR')}`}</b>
            <b>원</b>
          </>
        )}
      </div>

      <style jsx>{`
        input[type='checkbox'].product-checkbox {
          width: 25px;
          height: 25px;
          accent-color: #87ceeb;
        }

        .product-in-order-content {
          flex-flow: wrap;
          width: 20%;
          height: 100px;
        }

        a.prod-title {
          width: 100%;
          height: 40px;
          :hover {
            text-decoration: underline;
          }
        }
      `}</style>
    </div>
  )
}
