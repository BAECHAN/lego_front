import React, { useEffect, useState } from 'react'
import { ProductT } from 'types'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil'
import { orderCountSelector } from 'state/atoms'
export default function ProductInCart(props: {
  product: ProductT
  key: number
}) {
  const [quantity, setQuantity] = useState(props.product.order_quantity)
  const [minusDisabled, setMinusDisabled] = useState(true)
  const [plusDisabled, setPlusDisabled] = useState(false)

  let [orderCount, setOrderCount] = useRecoilState(orderCountSelector)

  const handleClickQuantity = (
    event: React.MouseEvent<HTMLButtonElement>,
    plusOrMinus: string
  ) => {
    if (quantity) {
      plusOrMinus === 'plus'
        ? setQuantity(quantity + 1)
        : setQuantity(quantity + 1)

      if (props.product) {
        if (quantity >= props.product.ea) {
          setPlusDisabled(true)
        } else if (quantity <= 1) {
          setMinusDisabled(true)
        } else {
          setPlusDisabled(false)
          setMinusDisabled(false)
        }
      }
    }
  }

  const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderCount(e.currentTarget.checked ? orderCount + 1 : orderCount - 1)
  }

  return (
    <li className="product-in-cart w-full flex justify-start items-center">
      <div>
        <input
          type="checkbox"
          className="product-checkbox mx-7"
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
              blurDataURL={`iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFc
              SJAAAADUlEQVR42mN8sFeoHgAGZAIwFY0DHwAAAABJRU5ErkJggg==`}
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
      <div></div>
      <div className="product-in-cart-quantity">
        <button
          onClick={(event) => handleClickQuantity(event, 'minus')}
          disabled={minusDisabled}
        >
          <FontAwesomeIcon
            icon={faMinus}
            className={`w-5 ${minusDisabled ? 'opacity-20' : 'opacity-100'}`}
          />
        </button>
        <div>{quantity}</div>
        <button
          onClick={(event) => handleClickQuantity(event, 'plus')}
          disabled={plusDisabled}
        >
          <FontAwesomeIcon
            icon={faPlus}
            className={`w-5 ${plusDisabled ? 'opacity-20' : 'opacity-100'}`}
          />
        </button>
      </div>
      <div>
        <FontAwesomeIcon
          icon={faTrashCan}
          width="15px"
          className="text-gray-500 hover:cursor-pointer hover:text-black"
        />
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
          width: 33%;
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
      `}</style>
    </li>
  )
}
