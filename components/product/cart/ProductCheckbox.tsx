import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { orderPriceSelector, selectedOrderSelector } from 'state/atoms'
import { ProductCartT } from 'types'

export default function ProductCheckbox(props: { product: ProductCartT; quantity: number; isChecked: boolean; setIsChecked: React.Dispatch<React.SetStateAction<boolean>> }) {
  let [selectedOrder, setSelectedOrder] = useRecoilState(selectedOrderSelector)
  let setTotalPrice = useSetRecoilState(orderPriceSelector)

  const calcuratedPrice = () => {
    let price = 0

    if (props.product.discounting === 1 && props.product.rate_discount > 0) {
      price = props.product.price * (1 - Number(props.product.rate_discount) / 100) * props.quantity
    } else {
      price = props.product.price * props.quantity
    }

    return price
  }

  const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setIsChecked(e.currentTarget.checked)

    if (e.currentTarget.checked) {
      setSelectedOrder((selectedOrder) => [...selectedOrder, Number(e.currentTarget.name.substring(17))])
      setTotalPrice((totalPrice) => totalPrice + calcuratedPrice())
    } else {
      setSelectedOrder(selectedOrder.filter((item) => item !== Number(e.currentTarget.name.substring(17))))
      setTotalPrice((totalPrice) => totalPrice - calcuratedPrice())
    }
  }

  return (
    <div>
      <input
        type="checkbox"
        className="product-checkbox mx-7"
        title="주문할 상품 선택"
        name={`product_checkbox_${props.product.cart_id}`}
        onInput={handleChangeCheck}
        defaultChecked={props.isChecked}
      />
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
