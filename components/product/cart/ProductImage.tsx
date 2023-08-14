import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ProductCartT } from 'types'

export default function ProductCartImage(props: { product: ProductCartT }) {
  return (
    <div className="product-in-cart-image mobile:w-64 mobile:scale-100 desktop:w-32 desktop:scale-75 desktop:hover:scale-90 desktop:transition-all desktop:ease-in-out">
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
    </div>
  )
}
