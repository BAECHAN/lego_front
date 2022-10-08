import Layout from '../../components/Layout'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Link from 'next/link'
import Image from 'next/image'

type Theme = {
  theme_id: number
  theme_title: string
  theme_title_en: string
  thumbnail_link: string
  theme_dscrp: string
}

export default function Themes() {
  let [themes, setThemes] = useState<Theme[]>([])

  useEffect(() => {
    axios
      .get('http://localhost:5000/getThemes')
      .then((response) => {
        if (response.status === 200) {
          setThemes(response.data)
          console.log(response.data)
        }
      })
      .catch((error) => {
        console.error(error.response)
      })
  }, [])

  return (
    <div>
      <Navbar />
      <h2 className="bg-sky-600	text-white p-3 text-3xl text-center">
        시리즈별
      </h2>
      <ul className="flex justify-around flex-wrap">
        {themes.map((theme, index) => {
          return (
            <li key={index} className="m-5 w-1/4">
              <Link
                href={`/themes/${theme.theme_title_en}?title_ko=${theme.theme_title}`}
              >
                <a>
                  <Image
                    src={theme.thumbnail_link}
                    width="300px"
                    height="150px"
                    alt={theme.theme_title + '_썸네일'}
                    className="hover:opacity-70"
                    placeholder="blur"
                    blurDataURL={`iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFc
                    SJAAAADUlEQVR42mN8sFeoHgAGZAIwFY0DHwAAAABJRU5ErkJggg==`}
                    layout="responsive"
                  />
                </a>
              </Link>
              <Link
                href={`/themes/${theme.theme_title_en}?title_ko=${theme.theme_title}`}
              >
                <a className="block text-center my-2 font-bold hover:text-blue-600">
                  {theme.theme_title}
                </a>
              </Link>
              <i className="text-sm">{theme.theme_dscrp}</i>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

Themes.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
