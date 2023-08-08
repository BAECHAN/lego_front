import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { orderPriceSelector, selectedOrderSelector } from 'state/atoms'
import { ProductCartT } from 'types'

export default function ProductCheckbox(props: { product: ProductCartT }) {
  let [selectedOrder, setSelectedOrder] = useRecoilState(selectedOrderSelector)
  let [totalPrice, setTotalPrice] = useRecoilState(orderPriceSelector)

  const [quantity, setQuantity] = useState(props.product.order_quantity)

  const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    let price = 0

    if (e.currentTarget.checked) {
      setSelectedOrder((selectedOrder) => [...selectedOrder, Number(e.currentTarget.name.substring(17))])

      if (props.product.discounting === 1 && props.product.rate_discount > 0) {
        price = props.product.price * (1 - Number(props.product.rate_discount) / 100) * quantity
      } else {
        price = props.product.price * quantity
      }
      setTotalPrice((totalPrice) => totalPrice + price)
    } else {
      setSelectedOrder(selectedOrder.filter((item) => item !== Number(e.currentTarget.name.substring(17))))

      if (props.product.discounting === 1 && props.product.rate_discount > 0) {
        price = props.product.price * (1 - Number(props.product.rate_discount) / 100) * quantity
      } else {
        price = props.product.price * quantity
      }
      setTotalPrice((totalPrice) => totalPrice - price)
    }
  }

  return (
    <div>
      <input type="checkbox" className="product-checkbox mx-7" title="주문할 상품 선택" name={`product_checkbox_${props.product.cart_id}`} onInput={handleChangeCheck} defaultChecked />
      <style jsx>{`
        input[type='checkbox'].product-checkbox {
          width: 25px;
          height: 25px;
          accent-color: #87ceeb;

          :hover {
            cursor: pointer;
          }
        }
      `}</style>
    </div>
  )
}
