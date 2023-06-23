import React from 'react'
import { OrderT } from 'types'
import Image from 'next/image'
import Link from 'next/link'

export default function ProductInOrderHistory(props: { order: OrderT }) {
  return (
    <div className="w-1/2">
      <div className="product-in-order w-full flex justify-start items-center">
        <div className="w-6/12 flex-col flex justify-center m-3">
          <div className="product-in-order-image w-32 scale-75 hover:scale-90 transition-all ease-in-out mb-1">
            <Link href={`/products/${props.order.product_number}`}>
              <a>
                <Image
                  src={props.order.image}
                  width="40vw"
                  height="20vw"
                  alt={props.order.title}
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
          <div className="product-in-order-content">
            <Link href={`/products/${props.order.product_number}`}>
              <a className="prod-title">{props.order.title}</a>
            </Link>
          </div>
        </div>

        <div className="flex-col flex items-center w-2/12">
          <div title="상품별 주문한 금액">
            {props.order.pay_price.toLocaleString('ko-kr')} 원
          </div>
        </div>

        <div>
          <div title="주문한 상품 수량">{props.order.order_quantity} 개</div>
        </div>
      </div>

      <style jsx>{`
        button.btn-refund,
        button.btn-delivery {
          background-color: gray;
          color: #fff;
          padding: 5px 10px;
          border-radius: 4px;

          :hover {
            background-color: #000;
          }
        }

        .product-in-order-content {
          flex-flow: wrap;
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
