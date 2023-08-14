import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ProductImageT } from 'types'

export default function ProductCartImage(props: { product: ProductImageT }) {
  return (
    <div className="product-image">
      <Link href={`/products/${props.product.product_number}?title=${props.product.title}`} passHref>
        <a>
          <Image
            src={props.product.image}
            width="40vw"
            height="20vw"
            alt={props.product.title}
            style={{ cursor: 'pointer' }}
            priority
            draggable={false}
            placeholder="blur"
            blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPgvCAACGQES86Y9kwAAAABJRU5ErkJggg==`}
            quality={100}
            layout="responsive"
          />
        </a>
      </Link>
      <style jsx>{`
        .product-image {
          width: 128px;
          --tw-scale-x: 0.75;
          --tw-scale-y: 0.75;
          transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x))
            scaleY(var(--tw-scale-y));
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

          :hover {
            --tw-scale-x: 0.9;
            --tw-scale-y: 0.9;
          }
          @media (max-width: 768px) {
            width: 256px;
            --tw-scale-x: 1;
            --tw-scale-y: 1;
          }
        }
      `}</style>
    </div>
  )
}
