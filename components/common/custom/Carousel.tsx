import useProduct from 'pages/api/query/useProduct'
import React, { useState } from 'react'
import Image from 'next/image'
import NukaCarousel from 'nuka-carousel'
import { ProductT } from 'types'
import useIsMobile from './isMobile'

export default function Carousel(props: { product: ProductT }) {
  const [carouselIdx, setCarouselIdx] = useState(0)

  const { data: product, isLoading } = useProduct(props.product)

  const isMobile = useIsMobile()

  return (
    <div className="prod-carousel">
      {isMobile ? (
        <div>
          <NukaCarousel
            autoplay
            autoplayInterval={3000}
            wrapAround
            withoutControls={true}
            zoomScale={1}
            cellSpacing={100}
            slideIndex={carouselIdx}
          >
            {product?.data.product_img_list?.map(
              (img: string, index: number) => {
                return (
                  <Image
                    key={index}
                    src={img}
                    alt={`${String(index)}번 이미지 메인`}
                    width="700px"
                    height="400px"
                    priority
                    quality={30}
                    placeholder="blur"
                    blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPgvCAACGQES86Y9kwAAAABJRU5ErkJggg==`}
                    layout="responsive"
                    onDragStart={(e) => e.preventDefault()}
                  />
                )
              }
            )}
          </NukaCarousel>
        </div>
      ) : (
        <div>
          <NukaCarousel
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
            {product?.data.product_img_list?.map(
              (img: string, index: number) => {
                return (
                  <Image
                    key={index}
                    src={img}
                    alt={`${String(index)}번 이미지 메인`}
                    width="700px"
                    height="400px"
                    priority
                    quality={30}
                    placeholder="blur"
                    blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPgvCAACGQES86Y9kwAAAABJRU5ErkJggg==`}
                    layout="responsive"
                    className="hover:scale-110"
                    onDragStart={(e) => e.preventDefault()}
                  />
                )
              }
            )}
          </NukaCarousel>
          <div className="text-center flex justify-around">
            {product?.data.product_img_list?.map(
              (img: string, index: number) => {
                return (
                  <div
                    key={index}
                    className="cursor-pointer"
                    onClick={() => setCarouselIdx(index)}
                  >
                    <Image
                      src={img}
                      alt={`${String(index)}번 이미지 서브`}
                      width="80px"
                      height="80px"
                      priority
                      quality={30}
                    />
                  </div>
                )
              }
            )}
          </div>
        </div>
      )}
    </div>
  )
}
