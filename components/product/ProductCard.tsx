import { ProductT } from 'types'
import Image from 'next/image'
import Link from 'next/link'
import ButtonWish from './ButtonWish'
import { useRouter } from 'next/router'
import ButtonAddCart from './ButtonAddCart'

export default function ProductCard(props: { product: ProductT; key: number }) {
  const router = useRouter()

  const handleClick = (path: string) => {
    sessionStorage.setItem('scrollY', `${window.scrollY}`)
    router.push(path)
  }

  return (
    <li
      className={`item-box ${
        router.pathname.indexOf('mypage') > -1 ? 'mypage' : ''
      }`}
    >
      <div id={String(props.product.product_id)}>
        <ButtonWish product_id={props.product.product_id} text={true} />
        <div className="item-img mb-12 scale-75 hover:scale-90 transition-all ease-in-out">
          <a
            onClick={() =>
              handleClick(`/products/${props.product.product_number}`)
            }
          >
            <Image
              src={props.product.image}
              width="40vw"
              height="20vw"
              alt={props.product.title}
              style={{ cursor: 'pointer' }}
              priority
              quality={30}
              placeholder="blur"
              blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPgvCAACGQES86Y9kwAAAABJRU5ErkJggg==`}
              layout="responsive"
            />
          </a>
        </div>
        <div className="item-sale mb-3">
          {props.product.discounting == 1 && props.product.rate_discount > 0 ? (
            <span className="bg-red-600 text-white p-1">
              - {props.product.rate_discount}%
            </span>
          ) : (
            <span className="invisible">invisible</span>
          )}
        </div>
        <div className="item-content">
          <Link href={`/products/${props.product.product_number}`}>
            <a className="prod-title">{props.product.title}</a>
          </Link>
          <div>
            {props.product.discounting == 1 &&
            props.product.rate_discount > 0 ? (
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

          {props.product.sale_enabled == 1 ? (
            <ButtonAddCart product_info={props.product} order_quantity={1} />
          ) : props.product.sale_enabled == 9 ? (
            <div className="text-red-600 text-lg text-center pt-7 font-bold">
              일시품절
            </div>
          ) : props.product.sale_enabled == 8 ? (
            <div className="text-blue-500 text-lg text-center pt-7 font-bold">
              출시예정
            </div>
          ) : null}
        </div>
      </div>
      <style jsx>{`
        .item-box {
          width: 33%;
          border: 1px solid #ddd;
          padding: 15px;
          min-width: 184px;

          &.mypage {
            width: 20%;

            @media (max-width: 768px) {
              width: 50%;
            }
          }
        }

        .item-content > * {
          margin: 13px 0px;
        }

        li {
          width: 300px;
        }

        a.prod-title {
          display: inline-block;
          width: 100%;
          height: 40px;
          :hover {
            text-decoration: underline;
          }
        }
      `}</style>
    </li>
  )
}
