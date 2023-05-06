import React, { useState } from 'react'
import {
  ProductCartT,
  ProductDeleteCartSubmitT,
  ProductUpdateCartSubmitT,
} from 'types'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil'
import { orderPriceSelector, selectedOrderSelector } from 'state/atoms'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'

export default function ProductInCart(props: { product: ProductCartT }) {
  const [quantity, setQuantity] = useState(props.product.order_quantity)
  const [minusDisabled, setMinusDisabled] = useState(
    props.product.order_quantity > 1 ? false : true
  )
  const [plusDisabled, setPlusDisabled] = useState(
    props.product.order_quantity + props.product.ea >
      props.product.order_quantity
      ? false
      : true
  )

  let [selectedOrder, setSelectedOrder] = useRecoilState(selectedOrderSelector)

  let [totalPrice, setTotalPrice] = useRecoilState(orderPriceSelector)

  let plusOrMinus = ''
  const { data: session, status } = useSession()

  const queryClient = useQueryClient()

  const handleClickQuantity = (
    e: React.MouseEvent<HTMLButtonElement>,
    clickOption: string
  ) => {
    plusOrMinus = clickOption

    if (quantity && status == 'authenticated' && session.user?.email) {
      let reqParam: ProductUpdateCartSubmitT = {
        email: session.user.email,
        cart_id: Number(e.currentTarget.name.substring(12)),
        product_id: props.product.product_id,
        state: plusOrMinus == 'plus' ? 'updateAdd' : 'updateSub',
      }

      updateQuantityAPI.mutate(reqParam)
    }
  }

  const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    let price = 0

    if (e.currentTarget.checked) {
      setSelectedOrder((selectedOrder) => [
        ...selectedOrder,
        Number(e.currentTarget.name.substring(17)),
      ])

      if (props.product.discounting == 1 && props.product.rate_discount > 0) {
        price =
          props.product.price *
          (1 - Number(props.product.rate_discount) / 100) *
          quantity
      } else {
        price = props.product.price * quantity
      }
      setTotalPrice((totalPrice) => totalPrice + price)
    } else {
      setSelectedOrder(
        selectedOrder.filter(
          (item) => item !== Number(e.currentTarget.name.substring(17))
        )
      )

      if (props.product.discounting == 1 && props.product.rate_discount > 0) {
        price =
          props.product.price *
          (1 - Number(props.product.rate_discount) / 100) *
          quantity
      } else {
        price = props.product.price * quantity
      }
      setTotalPrice((totalPrice) => totalPrice - price)
    }
  }

  const handleClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (session?.user?.email) {
      let param: ProductDeleteCartSubmitT = {
        email: session.user.email,
        cart_id: Number(e.currentTarget.name.substring(15)),
        product_id: props.product.product_id,
        order_quantity: props.product.order_quantity,
      }
      delCartAPI.mutate(param)
    }
  }

  const delCartAPI = useMutation(
    async (param: ProductDeleteCartSubmitT) => {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/del-cart`,

        JSON.stringify(param),
        {
          headers: { 'Content-Type': `application/json; charset=utf-8` },
        }
      )
      return res.data
    },
    {
      onSuccess: async (data) => {
        if (data.result == 1) {
          setSelectedOrder(selectedOrder.filter((item) => item !== data.cartId))
          queryClient.invalidateQueries(['product-cart-list'])
        } else {
          alert(
            '장바구니에서 삭제하는데 문제가 발생하였습니다.\r고객센터에 문의해주시기 바랍니다.'
          )
          return false
        }
      },
      onError: (error) => console.log(error),
    }
  )

  const updateQuantityAPI = useMutation(
    async (param: ProductUpdateCartSubmitT) => {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/upd-cart`,
        JSON.stringify(param),
        {
          headers: { 'Content-Type': `application/json; charset=utf-8` },
        }
      )
      return res.data
    },
    {
      onMutate: () => {
        let price = 0

        let prevInfo = {
          quantity: quantity,
          totalPrice: totalPrice,
          plusDisabled: plusDisabled,
          minusDisabled: minusDisabled,
        }

        if (plusOrMinus == 'plus') {
          setQuantity(quantity + 1)

          if (
            props.product.discounting == 1 &&
            props.product.rate_discount > 0
          ) {
            price =
              props.product.price *
              (1 - Number(props.product.rate_discount) / 100)
          } else {
            price = props.product.price
          }

          setTotalPrice((totalPrice) => totalPrice + price)

          if (quantity + 1 >= props.product.ea + props.product.order_quantity) {
            setPlusDisabled(true)
          } else {
            setPlusDisabled(false)
            setMinusDisabled(false)
          }
        } else {
          setQuantity(quantity - 1)

          if (
            props.product.discounting == 1 &&
            props.product.rate_discount > 0
          ) {
            price =
              props.product.price *
              (1 - Number(props.product.rate_discount) / 100)
          } else {
            price = props.product.price
          }
          setTotalPrice((totalPrice) => totalPrice - price)

          if (quantity <= 2) {
            setMinusDisabled(true)
          } else {
            setPlusDisabled(false)
            setMinusDisabled(false)
          }
        }

        return prevInfo
      },
      onSuccess: (data, values, rollback) => {
        if (data.result == 1) {
          console.log(data)
        } else {
          alert(
            '수량을 변경하는데 문제가 발생하였습니다.\r고객센터에 문의해주시기 바랍니다.'
          )
          if (rollback) {
            setQuantity(rollback.quantity)
            setTotalPrice(rollback.totalPrice)
            setPlusDisabled(rollback.plusDisabled)
            setMinusDisabled(rollback.minusDisabled)
          }
          return false
        }
      },
      onError: (error, values, rollback) => {
        alert(
          '수량을 변경하는데 문제가 발생하였습니다.\r고객센터에 문의해주시기 바랍니다.'
        )
        console.log(error)
        if (rollback) {
          setQuantity(rollback.quantity)
          setTotalPrice(rollback.totalPrice)
          setPlusDisabled(rollback.plusDisabled)
          setMinusDisabled(rollback.minusDisabled)
        }
      },
    }
  )

  return (
    <div className="product-in-cart w-full flex justify-start items-center">
      <div>
        <input
          type="checkbox"
          className="product-checkbox mx-7"
          title="주문할 상품 선택"
          name={`product_checkbox_${props.product.cart_id}`}
          onInput={handleChangeCheck}
          defaultChecked
        />
      </div>
      <div className="product-in-cart-image w-32 scale-75 hover:scale-90 transition-all ease-in-out">
        <Link href={`/products/${props.product.product_number}`}>
          <a>
            <Image
              src={props.product.image}
              width="40vw"
              height="20vw"
              alt={props.product.title}
              style={{ cursor: 'pointer' }}
              priority
              placeholder="blur"
              blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPgvCAACGQES86Y9kwAAAABJRU5ErkJggg==`}
              quality={100}
              layout="responsive"
            />
          </a>
        </Link>
      </div>
      <div className="product-in-cart-content flex content-around">
        <Link href={`/products/${props.product.product_number}`}>
          <a className="prod-title">{props.product.title}</a>
        </Link>
        <div className="">
          {props.product.discounting == 1 && props.product.rate_discount > 0 ? (
            <span>
              <b className="line-through">{`${props.product.price.toLocaleString(
                'ko-KR'
              )} 원`}</b>
              <b className="text-red-600 text-lg ml-3">{`${(
                props.product.price *
                (1 - Number(props.product.rate_discount) / 100)
              ).toLocaleString('ko-KR')} 원`}</b>
            </span>
          ) : (
            <b className="text-lg">{`${props.product.price.toLocaleString(
              'ko-KR'
            )} 원`}</b>
          )}
        </div>
      </div>
      <div className="product-in-cart-quantity">
        <button
          name={`product_sub_${props.product.cart_id}`}
          title="주문할 상품 수량 1개 빼기"
          onClick={(event) => {
            handleClickQuantity(event, 'minus')
          }}
          disabled={minusDisabled}
        >
          <FontAwesomeIcon
            icon={faMinus}
            className={`w-5 ${minusDisabled ? 'opacity-20' : 'opacity-100'}`}
          />
        </button>
        <div title="주문할 상품 수량">{quantity}</div>
        <button
          name={`product_add_${props.product.cart_id}`}
          title="주문할 상품 수량 1개 더하기"
          onClick={(event) => {
            handleClickQuantity(event, 'plus')
          }}
          disabled={plusDisabled}
        >
          <FontAwesomeIcon
            icon={faPlus}
            className={`w-5 ${plusDisabled ? 'opacity-20' : 'opacity-100'}`}
          />
        </button>
      </div>
      <div className="w-1/12 text-right">
        {props.product.discounting == 1 && props.product.rate_discount > 0 ? (
          <>
            <b className="product-price">{`${(
              props.product.price *
              quantity *
              (1 - Number(props.product.rate_discount) / 100)
            ).toLocaleString('ko-KR')}`}</b>
            <b> 원</b>
          </>
        ) : (
          <>
            <b className="product-price">{`${(
              props.product.price * quantity
            ).toLocaleString('ko-KR')}`}</b>
            <b>원</b>
          </>
        )}
      </div>
      <button
        type="button"
        title="상품을 장바구니에서 빼기"
        name={`product_delete_${props.product.cart_id}`}
        className="w-32 ml-28"
        onClick={(event) => handleClickDelete(event)}
      >
        <FontAwesomeIcon
          icon={faTrashCan}
          width="15px"
          className="text-gray-500 hover:cursor-pointer hover:text-black"
        />
      </button>
      <div className="text-center">
        <p>택배배송</p>
        <p className="font-semibold">배송비 무료</p>
      </div>

      <style jsx>{`
        input[type='checkbox'].product-checkbox {
          width: 25px;
          height: 25px;
          accent-color: #87ceeb;
        }

        .product-in-cart-content {
          flex-flow: wrap;
          width: 20%;
          height: 150px;
        }

        a.prod-title {
          width: 100%;
          height: 40px;
          :hover {
            text-decoration: underline;
          }
        }

        .product-in-cart-quantity {
          display: flex;
          margin: 5px 0px;
          width: 20%;
        }
        .product-in-cart-quantity > * {
          border: 1px solid #ddd;
          padding: 8px;
          width: 40px;
          height: 40px;
        }

        .product-in-cart-quantity > button:nth-child(odd):hover {
          cursor: pointer;
        }

        .product-in-cart-quantity > div:nth-child(even) {
          width: 52px;
          text-align: center;
          user-select: none;
        }

        .product-in-cart-quantity > div:nth-child(even) {
          width: 52px;
          text-align: center;
          user-select: none;
        }

        .product-in-cart-quantity > div:nth-child(even) {
          width: 52px;
          text-align: center;
          user-select: none;
        }

        .product-in-cart-quantity > div:nth-child(even) {
          width: 52px;
          text-align: center;
          user-select: none;
        }

        .prolict-in-cart-quantity > div:nth-child(even) {
          width: 52px;
          text-align: center;
          user-select: none;
        }
      `}</style>
    </div>
  )
}
