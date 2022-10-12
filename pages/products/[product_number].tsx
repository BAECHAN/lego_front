import Layout from '../../components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { ProductT } from 'types'
import Carousel from 'nuka-carousel'
import Navbar from '@components/Navbar'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import {
  faPlus,
  faMinus,
  faHeart as faHeartSolid,
  faCakeCandles,
  faCubes,
  faHashtag,
} from '@fortawesome/free-solid-svg-icons'

export async function getServerSideProps(context: any) {
  return {
    props: context.query,
  }
}

export default function Product(props: any) {
  const [carouselIdx, setCarouselIdx] = useState(0)
  let [quantity, setQuantity] = useState(1)
  let [minusDisabled, setMinusDisabled] = useState(false)
  let [plusDisabled, setPlusDisabled] = useState(false)
  let [like, setLike] = useState(false)

  const { data: product } = useQuery<ProductT>(
    ['http://localhost:5000/api/getProductInfo'],
    async () => {
      const res = await fetch(
        `http://localhost:5000/api/getProductInfo?product_number=${Number(
          props.product_number
        )}`
      )
      return res.json()
    },
    {
      onSuccess: (data) => console.log(data),
      onError: (e) => console.log(e),
    }
  )

  const handleClickQuantity = (
    event: React.MouseEvent<HTMLButtonElement>,
    plusOrMinus: string
  ) => {
    plusOrMinus === 'plus' ? setQuantity(++quantity) : setQuantity(--quantity)

    if (product) {
      if (quantity >= product?.product_info?.ea) {
        setPlusDisabled(true)
      } else if (quantity <= 0) {
        setMinusDisabled(true)
      } else {
        setPlusDisabled(false)
        setMinusDisabled(false)
      }
    }
  }

  const handleClickLike = () => {
    setLike(!like)
  }

  return (
    <div>
      <Navbar currentPage={props.theme_title} />
      <div className="prod-main flex flex-wrap">
        <div className="prod-img w-8/12">
          <Carousel
            autoplay
            autoplayInterval={5000}
            pauseOnHover
            wrapAround
            withoutControls={true}
            zoomScale={0.85}
            animation="zoom"
            cellSpacing={300}
            slideIndex={carouselIdx}
          >
            {product
              ? product.product_img_list &&
                product.product_img_list.map((img, index) => {
                  return (
                    <Image
                      key={index}
                      src={img}
                      alt={String(index)}
                      width="700px"
                      height="400px"
                      priority
                      quality={100}
                      layout="responsive"
                    />
                  )
                })
              : null}
          </Carousel>
          <div className="text-center flex">
            {product
              ? product.product_img_list &&
                product.product_img_list.map((img, index) => {
                  return (
                    <div
                      key={index}
                      className="cursor-pointer"
                      onClick={() => setCarouselIdx(index)}
                    >
                      <Image
                        src={img}
                        alt={String(index)}
                        width="80px"
                        height="80px"
                        priority
                        quality={100}
                      />
                    </div>
                  )
                })
              : null}
          </div>
          <div className="prod-attr">
            <div>
              <div>
                <FontAwesomeIcon icon={faCakeCandles} />
              </div>
              <div>{product?.product_info?.ages}+</div>
              <span>연령</span>
            </div>
            <div>
              <div>
                <FontAwesomeIcon icon={faCubes} />
              </div>
              <div>{product?.product_info?.pieces}+</div>
              <span>부품수</span>
            </div>
            <div>
              <div>
                <FontAwesomeIcon icon={faHashtag} />
              </div>
              <div>{product?.product_info?.product_number}+</div>
              <span>제품명</span>
            </div>
          </div>
        </div>
        <div className="prod-buy w-4/12">
          <div className="my-10">
            <p className="text-3xl break-normal">
              {product?.product_info?.title}
            </p>
          </div>
          <div className="my-5">
            <b className="text-2xl">{`${product?.product_info?.price?.toLocaleString(
              'ko-KR'
            )} 원`}</b>
            {product?.product_info?.sale_enabled === 1 ? (
              <p className="text-green-600">구매 가능</p>
            ) : null}
          </div>
          <div className="flex">
            <div className="prod-buy-quantity">
              <button
                onClick={(event) => handleClickQuantity(event, 'minus')}
                disabled={minusDisabled}
              >
                <FontAwesomeIcon
                  icon={faMinus}
                  className={`w-5 ${
                    minusDisabled ? 'opacity-20' : 'opacity-100'
                  }`}
                />
              </button>
              <div>{quantity}</div>
              <button
                onClick={(event) => handleClickQuantity(event, 'plus')}
                disabled={plusDisabled}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  className={`w-5 ${
                    plusDisabled ? 'opacity-20' : 'opacity-100'
                  }`}
                />
              </button>
            </div>
            <div className="grow"></div>
            <div className="p-3">
              {`구매 가능 수량 ${product?.product_info?.ea} 개`}
            </div>
          </div>
          <div className="flex">
            <button type="button" className="add-to-cart">
              장바구니 담기
            </button>
            <button
              type="button"
              className="w-16"
              onClick={() => handleClickLike()}
            >
              {like === false ? (
                <FontAwesomeIcon
                  icon={faHeart}
                  className="ml-5 w-4 text-blue-700"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faHeartSolid}
                  className="ml-5 w-4 text-blue-700"
                />
              )}
            </button>
          </div>
        </div>
        <div className="prod-detail w-full h-96 ">디테일</div>
      </div>
      <style jsx>{`
        .prod-main > * {
          border: 1px solid #ddd;
          padding: 15px;
        }
        .prod-buy-quantity {
          display: flex;
          margin: 5px 0px;
          width: 33%;
        }
        .prod-buy-quantity > * {
          border: 1px solid #ddd;
          padding: 8px;
          width: 40px;
          height: 40px;
        }

        .prod-buy-quantity > button:nth-child(odd):hover {
          cursor: pointer;
        }

        .prod-buy-quantity > div:nth-child(even) {
          width: 80px;
          text-align: center;
          user-select: none;
        }
        .prod-attr {
          display: flex;
          justify-content: space-around;
          border: 1px solid #ddd;
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
      `}</style>
    </div>
  )
}

Product.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
