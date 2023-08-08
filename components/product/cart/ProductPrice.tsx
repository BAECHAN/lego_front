import React from 'react'
import { ProductCartT } from 'types'

export default function ProductPrice(props: { product: ProductCartT; quantity: number; setQuantity: React.Dispatch<React.SetStateAction<number>> }) {
  return (
    <div className="mobile:flex mobile:justify-center desktop:w-1/12 desktop:text-right">
      {props.product.discounting === 1 && props.product.rate_discount > 0 ? (
        <>
          <p className="product-price">{`${(props.product.price * props.quantity * (1 - Number(props.product.rate_discount) / 100)).toLocaleString('ko-KR')}`}</p>
          <p> 원</p>
        </>
      ) : (
        <>
          <p className="product-price">{`${(props.product.price * props.quantity).toLocaleString('ko-KR')}`}</p>
          <p>원</p>
        </>
      )}
    </div>
  )
}
