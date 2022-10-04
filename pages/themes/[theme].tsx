import Layout from '../../components/Layout'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import Image from 'next/image'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'

type Item = {
  product_id: number
  title: string
  image: string
  price: number
  ages: number
  product_number: number
  date_released: Date
  sale_enabled: number
  discounting: boolean
  rate_discount: number
  ea: number
}

export default function Theme() {
  const router = useRouter()
  const { theme } = router.query

  console.log(router.query)

  let [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    axios
      .get('http://localhost:5000/getItems?theme_id=13')
      .then((response) => {
        if (response.status === 200) {
          setItems(response.data)
        }
      })
      .catch((error) => {
        console.error(error.reponse)
      })
  }, [])

  return (
    <div>
      <Navbar currentPage={router.query.title_ko} />
      <h2 className="theme-name">{theme}</h2>

      <div className="main">
        <Sidebar />
        <ul>
          {items.map((item, index) => {
            return (
              <li key={index} className="item-box">
                <div id={String(item.product_id)}>
                  <div className="item-img mb-20">
                    <Image
                      src={item.image}
                      width="300%"
                      height="150%"
                      alt={item.title}
                      priority
                    />
                  </div>
                  <h2>{item.title}</h2>
                  <br />
                  <h2>{`${item.price.toLocaleString('ko-KR')} 원`}</h2>
                  <button type="button" className="add-to-cart">
                    장바구니 담기
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      <style jsx>{`
        .main {
          display: flex;
        }
        .item-box {
          width: 33%;
          border: 1px solid #ddd;
          padding: 15px;
        }
        .item-box > div * {
          margin-top: 5px;
        }
        ul {
          display: flex;
          flex-wrap: wrap;
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
