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
  let [detailOpen, setDetailOpen] = useState(false)

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
        <div className="prod-img w-8/12 p-4">
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
              <div className="text-2xl mb-3">
                {product?.product_info?.ages}+
              </div>
              <span className="text-base">연령</span>
            </div>
            <div>
              <div className="text-2xl mb-3">
                {product?.product_info?.pieces}
              </div>
              <span className="text-base">부품수</span>
            </div>
            <div>
              <div className="text-2xl mb-3">
                {product?.product_info?.product_number}
              </div>
              <span className="text-base">제품명</span>
            </div>
          </div>
        </div>
        <div className="prod-buy w-4/12 p-4">
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
            ) : product?.product_info?.sale_enabled === 9 ? (
              <p className="text-red-600">일시 품절</p>
            ) : product?.product_info?.sale_enabled === 8 ? (
              <p className="text-orange-600">출시 예정</p>
            ) : null}
          </div>
          <div className="flex mb-5">
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
        <div className="prod-detail w-full h-96 ">
          <button
            className="prod-accordion flex items-center text-xl bg-gray-100 w-full h-24"
            onClick={() => setDetailOpen(!detailOpen)}
          >
            <span className="relative left-10 text-2xl">제품상세정보</span>
            <div className="flex-grow"></div>
            <div>
              {detailOpen ? (
                <FontAwesomeIcon
                  icon={faMinus}
                  className={'w-7 p-1 bg-white rounded-full relative right-10'}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faPlus}
                  className={'w-7 p-1 bg-white rounded-full relative right-10'}
                />
              )}
            </div>
          </button>
          {detailOpen ? (
            <div className="prod-features">
              어린이 FC 바르셀로나 팬이 열광할 만한 브릭헤즈™ 모델이 나왔어요.
              세계적으로 많은 팬을 자랑하는 축구 클럽에 어서 들어오세요! 3가지의
              피부색, 4가지의 머리 색깔, 그리고 스파이크, 포니테일, 모호크, 삭발
              등의 여러 가지 헤어스타일을 어떻게 조합하여 나만의 모습을
              연출해볼까요? 끝으로 유명한 클럽의 문장이 앞면에 박힌 유니폼을
              입히고, 스티커 시트 2매를 이용해 마음에 드는 등번호를 붙여주세요.
              레고® 브릭헤즈™ 세트를 통해 FC 바르셀로나의 선수가 되어보아요 -
              10세 이상의 사용자에게 적합하며, 세계적인 축구 팀의 선수를
              내손으로 직접 조립하는 즐거움을 안겨줍니다 맞춤형 모델 – 3가지의
              피부색, 4가지의 머리 색깔, 그리고 여러 가지 헤어스타일을 선택할 수
              있습니다. 2장의 스티커 시트를 이용해 유니폼의 번호를 골라 붙이세요
              놀이와 전시 – 모델의 크기는 세운 자세에서 높이 8cm이며, FC
              바르셀로나 팬의 즐거움을 더해줄 작은 골대와 축구공이 함께 들어
              있습니다
            </div>
          ) : null}
        </div>
      </div>
      <style jsx>{`
        .prod-accordion {
        }

        .prod-main > * {
          border-top: 1px solid #ddd;
          border-left: 1px solid #ddd;
          border-right: 1px solid #ddd;
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
          width: 300px;
          margin: 20px auto;
          text-align: center;
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
