import Layout from '../../components/Layout'
import Head from 'next/head'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { ProductT } from 'types'
import Carousel from 'nuka-carousel'
import Navbar from '@components/Navbar'
import { useState } from 'react'

export async function getServerSideProps(context: any) {
  return {
    props: context.query,
  }
}

export default function Product(props: any) {
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

  const [carouselIdx, setCarouselIdx] = useState(0)

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
            cellSpacing={100}
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
        </div>
        <div className="prod-buy w-4/12">
          <p className="text-3xl break-normal">
            {product?.product_info?.title}
          </p>
          <b className="text-2xl">{`${product?.product_info?.price?.toLocaleString(
            'ko-KR'
          )} 원`}</b>
          <button type="button" className="add-to-cart">
            장바구니 담기
          </button>
        </div>
        <div className="prod-detail w-full h-96 ">디테일</div>
      </div>
      <style jsx>{`
        .prod-main > * {
          border: 1px solid #ddd;
          padding: 15px;
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
