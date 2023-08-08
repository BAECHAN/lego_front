import useIsMobile from '@components/common/custom/isMobile'
import Link from 'next/link'
import React from 'react'
import { ProductCartT } from 'types'

export default function ProductCartTitle(props: { product: ProductCartT }) {
  const isMobile = useIsMobile()

  return (
    <div className="product-in-cart-content flex desktop:content-around mobile:content-center mobile:justify-center mobile:text-center">
      <Link href={`/products/${props.product.product_number}`}>
        <a className="prod-title">{props.product.title}</a>
      </Link>
      {!isMobile && (
        <div className="">
          {props.product.discounting === 1 && props.product.rate_discount > 0 ? (
            <span>
              <b className="line-through">{`${props.product.price.toLocaleString('ko-KR')} 원`}</b>
              <b className="text-red-600 text-lg ml-3">{`${(props.product.price * (1 - Number(props.product.rate_discount) / 100)).toLocaleString('ko-KR')} 원`}</b>
            </span>
          ) : (
            <b className="text-lg">{`${props.product.price.toLocaleString('ko-KR')} 원`}</b>
          )}
        </div>
      )}

      <style jsx>{`
        a.prod-title {
          width: 100%;
          height: 40px;
          :hover {
            text-decoration: underline;
          }
        }

        .product-in-cart-content {
          flex-flow: wrap;
          width: 20%;
          height: 150px;

          @media (max-width: 768px) {
            width: 100%;
            height: 70px;
          }
        }
      `}</style>
    </div>
  )
}
