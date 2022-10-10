import Layout from '../../components/Layout'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import Image from 'next/image'
import Link from 'next/link'

import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

import { ThemeT, ProductT } from 'types'

export async function getServerSideProps(context: any) {
  return {
    props: context.query,
  }
}

export default function Theme(props: ThemeT) {
  const { data: products } = useQuery<ProductT[]>(
    ['http://localhost:5000/api/getProductList'],
    async () => {
      const res = await fetch(
        `http://localhost:5000/api/getProductList?theme_id=${props.theme_id}`
      )
      return res.json()
    },
    {
      onSuccess: (data) => console.log(data),
      onError: (e) => console.log(e),
    }
  )

  return (
    <div>
      <Navbar currentPage={props.theme_title} />
      <div className="flex">
        <Sidebar />
        <ul className="flex flex-wrap">
          {products &&
            products.map((product, index) => {
              return (
                <li key={index} className="item-box">
                  <div id={String(product.product_id)}>
                    <div className="item-img mb-12">
                      <Link href={`/products/${product.product_number}`}>
                        <a>
                          <Image
                            src={product.image}
                            width="300%"
                            height="150%"
                            alt={product.title}
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
                    <div className="item-content">
                      <h2>{product.title}</h2>
                      <h2>{`${product.price.toLocaleString('ko-KR')} 원`}</h2>
                      <button type="button" className="add-to-cart">
                        장바구니 담기
                      </button>
                    </div>
                  </div>
                </li>
              )
            })}
        </ul>
      </div>
      <style jsx>{`
        .item-box {
          width: 33%;
          border: 1px solid #ddd;
          padding: 15px;
        }
        .item-content > * {
          margin: 10px 0px;
        }
        li {
          width: 300px;
          height: 400px;
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

Theme.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
