import Layout from '../../components/Layout'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { ProductT } from 'types'
import Carousel from 'nuka-carousel'
import Navbar from '@components/Navbar'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import ButtonWish from '@components/ButtonWish'
import axios from 'axios'

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
  let [detailOpen, setDetailOpen] = useState(true)

  const { data: product } = useQuery<ProductT>(
    ['http://localhost:5000/api/getProductInfo'],
    async () => {
      const res = await axios.get(
        `http://localhost:5000/api/getProductInfo?product_number=${Number(
          props.product_number
        )}`
      )
      return res.data
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

  return (
    <div className="px-32">
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
                      className="hover:scale-110"
                    />
                  )
                })
              : null}
          </Carousel>
          <div className="text-center flex justify-around">
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
            <div className="m-auto">
              <ButtonWish text={false} />
            </div>
          </div>
        </div>
        <div className="prod-detail w-full">
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
          <div className={`prod-features ${detailOpen ? 'block' : 'none'}`}>
            <div className="prod-features-contents p-10 w-2/3">
              <p>
                레고® 테크닉 에어버스 H175 구조 헬리콥터(42145) 장난감 세트를
                통해 탐구열에 불타는 11세 이상의 아이들에게 헬리콥터의 작동
                원리를 가르쳐주세요. 다양하고 멋진 온갖 기능과 부품이 어떻게
                합쳐져서 탐색/구조용 탑승기계가 만들어지는지 알아보자고요.
              </p>

              <p>
                사실감과 정교함
                <br />
                에어버스 H175 구조 헬리콥터 모델의 기능이 매우 다양하며, 현실
                세계의 헬리콥터와 다름없는 모습을 보여줍니다. 모터(포함되어
                있음)의 힘으로 모델이 작동하는 모습이 마치 실제 기계를 눈앞에서
                보는 느낌이에요. 속도 가감 설정이 가능한 회전날개와 꼬리날개,
                접이식 랜딩기어, 윈치, 엔진 등의 부품이 어떻게 움직이는지
                보이나요? 그 외에도, 로터 블레이드의 피치 제어를 위한 경사판,
                조종석 도어, 조수석 슬라이딩 도어, 열고 닫히는 전후의 카울링 등
                볼수록 재미있는 다양한 수동 기능이 탑재되어 있습니다.
              </p>

              <p>
                엔지니어링 세계와의 첫 만남
                <br />
                레고® 테크닉 조립 장난감은 작동 방식과 메커니즘이 매우
                사실적으로디자인되어 어린 레고 사용자도 쉽게 이해할 수 있을 뿐
                아니라, 현실적인 방식으로 공학의 세계를 배우기에도 더없이
                적합합니다.
              </p>
              <ul>
                <li>
                  헬리콥터의 작동 원리를 배워보아요 – 레고® 테크닉 에어버스 H175
                  구조 헬리콥터(42145) 탐색/구조 헬리콥터 장난감 모델 세트를
                  통해 11세 이상의 아이들에게 헬리콥터의 작동 원리를 하나하나
                  알아가는 즐거움을 안겨주세요
                </li>
                <li>
                  전동 기능 – 회전날개와 꼬리날개를 돌리고 속도를 가감 조절하고
                  랜딩기어를 접거나 펴고 윈치와 엔진을 작동하는 등,
                  모터(포함되어 있음)의 힘으로 다양한 기능을 작동할 수 있습니다
                </li>
                <li>
                  수동 기능 – 경사판을 이용해 로터 블레이드의 피치를 제어하고,
                  전후의 카울링을 열거나 닫고, 로터와 엔진의 조향 메커니즘을
                  살펴볼 수 있습니다
                </li>
                <li>
                  여닫이식 도어 – 열고 닫을 수 있는 조종석 도어와 조수석의
                  슬라이딩 도어가 장착되어 있습니다
                </li>
                <li>
                  11세 이상의 아이들을 위한 선물 – 도전의욕이 충만한 아이들을
                  위한 조립 프로젝트로 이 헬리콥터 장난감 세트를 추천합니다
                </li>
                <li>
                  치수 – 높이 24cm, 길이 72cm, 폭 13cm 크기의 레고® 테크닉 조립
                  모델이 들어있습니다
                </li>
                <li>
                  배터리와 모터 – 배터리 구동식 헬리콥터 장난감의 작동을 위해
                  1.5v LR6(AA) 배터리(포함되어 있음) 6개가 필요하며, 아울러 모터
                  1개가 세트에 들어 있습니다
                </li>
                <li>
                  엔지니어링 세계로의 첫걸음 - 레고® 테크닉 조립 모델은 작동
                  방식과 메커니즘이 매우 사실적이며, 어린 레고 사용자에게 공학의
                  세계를 가르쳐주기에 매우 좋습니다
                </li>
                <li>
                  뛰어난 품질 – 레고® 테크닉 부품은 엄격한 산업 표준을 충족하며,
                  일관성과 호환성, 그리고 매번 견고하게 결합된다는 특성을
                  보장합니다
                </li>
                <li>
                  안전 우선 – 레고® 테크닉 부품은 떨어뜨리고 가열하고 부수고
                  비틀고 분석하는 과정을 통해 가장 엄격한 글로벌 안전 기준을
                  충족합니다
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .prod-features-contents li,
        .prod-features-contents p {
          margin: 20px 0px;
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
