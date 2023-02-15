import { ProductT } from 'types'
import Image from 'next/image'
import Link from 'next/link'
import ButtonWish from './ButtonWish'
import { useRouter } from 'next/router'

export default function ProductCard(props: { product: ProductT; key: number }) {
  const router = useRouter()

  return (
    <li
      className={
        router.pathname.indexOf('mypage') > -1 ? `item-box-mypage` : `item-box`
      }
    >
      <div id={String(props.product.product_id)}>
        <ButtonWish text={true} />
        <div className="item-img mb-12 scale-75 hover:scale-90 transition-all ease-in-out">
          <Link href={`/products/${props.product.product_number}`}>
            <a>
              <Image
                src={props.product.image}
                width="40vw"
                height="20vw"
                alt={props.product.title}
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
            <button type="button" className="add-to-cart">
              장바구니 담기
            </button>
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
        }

        .item-box-mypage {
          width: 20%;
          border: 1px solid #ddd;
          padding: 15px;
        }

        .item-content > * {
          margin: 13px 0px;
        }
        li {
          width: 300px;
        }

        .add-to-cart {
          width: 100%;
          background-color: rgb(253, 128, 36);
          border-color: rgb(253, 128, 36);
          color: rgb(0, 0, 0);
          border-width: 2px;
          padding: 0.9375rem;
          border-style: solid;
          border-radius: 4px;
          border-collapse: collapse;
          text-align: center;
          font-weight: 700;
        }
        .add-to-cart:hover {
          color: white;
          opacity: 0.7;
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
