import Layout from '../../components/Layout'
import Navbar from '../../components/Navbar'
import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { ThemeT } from 'types/index'
import axios from 'axios'

export default function Themes() {
  const { data: themes } = useQuery<ThemeT[]>(
    ['http://localhost:5000/api/getThemeList'],
    async () => {
      const res = await axios.get('http://localhost:5000/api/getThemeList')
      return res.data
    },
    {
      onSuccess: (data) => console.log(data),
      onError: (e) => console.log(e),
    }
  )

  return (
    <div className="px-32">
      <Navbar />
      <h2 className="bg-sky-600	text-white p-3 text-3xl text-center">
        시리즈별
      </h2>
      <ul className="flex justify-around flex-wrap">
        {themes &&
          themes.map((theme) => {
            return (
              <li key={theme.theme_id} className="m-5 w-1/5">
                <Link
                  href={`/themes/${theme.theme_title_en}?theme_title=${theme.theme_title}&theme_id=${theme.theme_id}`}
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
                  href={`/themes/${theme.theme_title_en}?title_ko=${theme.theme_title}&theme_id=${theme.theme_id}`}
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
