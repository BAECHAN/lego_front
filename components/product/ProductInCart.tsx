import React, { useState } from 'react'
import { ProductCartT } from 'types'

import useIsMobile from '@components/common/custom/isMobile'

import ProductCheckbox from './cart/ProductCheckbox'
import ProductDeleteButton from './cart/ProductDeleteButton'
import ProductCartImage from './cart/ProductImage'
import ProductPrice from './cart/ProductPrice'
import ProductQuantity from './cart/ProductQuantity'
import ProductCartTitle from './cart/ProductTitle'

export default function ProductInCart(props: { product: ProductCartT }) {
  const isMobile = useIsMobile()

  const [quantity, setQuantity] = useState(props.product.order_quantity)

  return (
    <div className="product-in-cart w-full">
      {isMobile ? (
        <div className="flex flex-col my-10">
          <div className="flex justify-start items-center">
            <ProductCheckbox product={props.product} />
            <ProductCartImage product={props.product} />
            <ProductDeleteButton product={props.product} />
          </div>
          <ProductCartTitle product={props.product} />
          <ProductQuantity product={props.product} quantity={quantity} setQuantity={setQuantity} />
          <ProductPrice product={props.product} quantity={quantity} setQuantity={setQuantity} />
        </div>
      ) : (
        <div className="flex justify-start items-center">
          <ProductCheckbox product={props.product} />
          <ProductCartImage product={props.product} />
          <ProductCartTitle product={props.product} />
          <ProductQuantity product={props.product} quantity={quantity} setQuantity={setQuantity} />
          <ProductPrice product={props.product} quantity={quantity} setQuantity={setQuantity} />
          <ProductDeleteButton product={props.product} />
          <div className="text-center">
            <p>택배배송</p>
            <p className="font-semibold">배송비 무료</p>
          </div>
        </div>
      )}
    </div>
  )
}
