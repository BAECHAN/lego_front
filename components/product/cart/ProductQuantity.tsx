import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { orderPriceSelector } from 'state/atoms'
import { ProductCartT, ProductUpdateCartSubmitT } from 'types'

export default function ProductQuantity(props: { product: ProductCartT; quantity: number; setQuantity: React.Dispatch<React.SetStateAction<number>> }) {
  const { data: session, status } = useSession()

  const [minusDisabled, setMinusDisabled] = useState(props.product.order_quantity > 1 ? false : true)
  const [plusDisabled, setPlusDisabled] = useState(props.product.order_quantity + props.product.ea > props.product.order_quantity ? false : true)

  let [totalPrice, setTotalPrice] = useRecoilState(orderPriceSelector)

  let plusOrMinus = ''

  const handleClickQuantity = (e: React.MouseEvent<HTMLButtonElement>, clickOption: string) => {
    plusOrMinus = clickOption

    if (props.quantity && status === 'authenticated' && session.user?.email) {
      let reqParam: ProductUpdateCartSubmitT = {
        email: session.user.email,
        cart_id: Number(e.currentTarget.name.substring(12)),
        product_id: props.product.product_id,
        state: plusOrMinus === 'plus' ? 'updateAdd' : 'updateSub',
      }

      updateQuantityAPI.mutate(reqParam)
    }
  }

  const updateQuantityAPI = useMutation(
    async (param: ProductUpdateCartSubmitT) => {
      return await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/upd-cart`, JSON.stringify(param), {
        headers: { 'Content-Type': `application/json; charset=utf-8` },
      })
    },
    {
      onMutate: () => {
        let price = 0

        let prevInfo = {
          quantity: props.quantity,
          totalPrice: totalPrice,
          plusDisabled: plusDisabled,
          minusDisabled: minusDisabled,
        }

        if (plusOrMinus === 'plus') {
          props.setQuantity(props.quantity + 1)

          if (props.product.discounting === 1 && props.product.rate_discount > 0) {
            price = props.product.price * (1 - Number(props.product.rate_discount) / 100)
          } else {
            price = props.product.price
          }

          setTotalPrice((totalPrice) => totalPrice + price)

          if (props.quantity + 1 >= props.product.ea + props.product.order_quantity) {
            setPlusDisabled(true)
          } else {
            setPlusDisabled(false)
            setMinusDisabled(false)
          }
        } else {
          props.setQuantity(props.quantity - 1)

          if (props.product.discounting === 1 && props.product.rate_discount > 0) {
            price = props.product.price * (1 - Number(props.product.rate_discount) / 100)
          } else {
            price = props.product.price
          }
          setTotalPrice((totalPrice) => totalPrice - price)

          if (props.quantity <= 2) {
            setMinusDisabled(true)
          } else {
            setPlusDisabled(false)
            setMinusDisabled(false)
          }
        }

        return prevInfo
      },
      onSuccess: (response, variables, rollback) => {
        if (!(response.status === 204)) {
          alert('의도하지 않은 응답입니다.\r고객센터에 문의해주시기 바랍니다.')
          console.error(`HTTP status : ${response?.status}`)

          if (rollback) {
            props.setQuantity(rollback.quantity)
            setTotalPrice(rollback.totalPrice)
            setPlusDisabled(rollback.plusDisabled)
            setMinusDisabled(rollback.minusDisabled)
          }
        }
      },
      onError: (error, values, rollback) => {
        alert('수량을 변경하는데 문제가 발생하였습니다.\r고객센터에 문의해주시기 바랍니다.')
        console.log(error)
        if (rollback) {
          props.setQuantity(rollback.quantity)
          setTotalPrice(rollback.totalPrice)
          setPlusDisabled(rollback.plusDisabled)
          setMinusDisabled(rollback.minusDisabled)
        }
      },
    }
  )

  return (
    <div className="product-in-cart-quantity mobile:flex mobile:justify-center">
      <button
        name={`product_sub_${props.product.cart_id}`}
        title="주문할 상품 수량 1개 빼기"
        onClick={(event) => {
          handleClickQuantity(event, 'minus')
        }}
        disabled={minusDisabled}
      >
        <FontAwesomeIcon icon={faMinus} className={`w-5 ${minusDisabled ? 'opacity-20' : 'opacity-100'}`} />
      </button>
      <div title="주문할 상품 수량">{props.quantity}</div>
      <button
        name={`product_add_${props.product.cart_id}`}
        title="주문할 상품 수량 1개 더하기"
        onClick={(event) => {
          handleClickQuantity(event, 'plus')
        }}
        disabled={plusDisabled}
      >
        <FontAwesomeIcon icon={faPlus} className={`w-5 ${plusDisabled ? 'opacity-20' : 'opacity-100'}`} />
      </button>
      <style jsx>{`
        .product-in-cart-quantity {
          display: flex;
          margin: 5px 0px;
          width: 20%;

          @media (max-width: 768px) {
            width: 100%;
          }

          > {
            * {
              border: 1px solid #ddd;
              padding: 8px;
              width: 40px;
              height: 40px;
            }

            button:nth-child(odd):hover {
              cursor: pointer;
            }

            div:nth-child(even) {
              width: 52px;
              text-align: center;
              user-select: none;
            }
          }
        }
      `}</style>
    </div>
  )
}
