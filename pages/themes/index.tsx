import Layout from '../../components/Layout'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Link from 'next/link'
import Image from 'next/image'

export default function Themes() {
  type Theme = {
    theme_id: number,
    theme_title: string,
    theme_title_en: string,
    thumbnail_link: string,
    theme_dscrp: string
  }
  let [themes, setThemes] = useState<Theme[]>([])

  useEffect(() => {
    axios
      .get('http://localhost:5000/getTheme')
      .then((response) => {
        if (response.status === 200) {
          setThemes(response.data);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response)
      })
  }, [])

  return (
    <div>
      <Navbar />
      <h2>시리즈별</h2>
      <ul>
        {themes.map((item, index) => {
          return (
            <li key={index} className="m-5 w-1/4">
              <Link href={`/themes/${item.theme_title_en}?title_ko=${item.theme_title}`}>
                <a>
                  <Image
                    src={item.thumbnail_link}
                    width="300px"
                    height="150px"
                    alt={item.theme_title + '_썸네일'}
                    className="hover:opacity-70"
                  />
                </a>
              </Link>
              <strong>{item.theme_title}</strong>
              <i className="text-sm">{item.theme_dscrp}</i>
            </li>
          )
        })}
      </ul>

      <style jsx>{`
        h2 {
          background-color: rgb(0, 109, 183);
          color: #fff;
          padding: 10px;
          font-size: 30px;
          text-align: center;
        }
        ul {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
        }
        strong {
          display: block;
          text-align: center;
        }
      `}</style>
    </div>
  )
}

Themes.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
