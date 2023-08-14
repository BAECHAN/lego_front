import Image from 'next/image'
import Link from 'next/link'
import { ThemeT } from 'types'

import useThemes from 'pages/api/query/useThemes'

import Layout from '../../components/Layout'
import Navbar from '../../components/NavigationBar'

export default function Themes() {
  const { data: themes, isFetched } = useThemes()

  return (
    <div className="desktop:px-32">
      <Navbar />
      <div className="min-h-[1500px] desktop:min-w-[780px] mobile:text-sm">
        {isFetched ? (
          <>
            <h2 className="bg-sky-600	text-white p-3 text-3xl text-center">시리즈별</h2>
            <ul className="flex justify-around flex-wrap">
              {themes?.data.map((theme: ThemeT) => {
                return (
                  <li key={theme.theme_id} className="m-5 desktop:w-1/5">
                    <Link href={`/themes/${theme.theme_title_en}?theme_title=${theme.theme_title}&theme_id=${theme.theme_id}`} passHref>
                      <a title="상품 상세보기 링크(이미지 클릭)">
                        <Image
                          src={theme.thumbnail_link}
                          width="300px"
                          height="150px"
                          alt={theme.theme_title + '_썸네일'}
                          className="hover:opacity-70"
                          placeholder="blur"
                          blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPgvCAACGQES86Y9kwAAAABJRU5ErkJggg==`}
                          layout="responsive"
                          priority
                          quality={30}
                        />
                      </a>
                    </Link>
                    <Link href={`/themes/${theme.theme_title_en}?theme_title=${theme.theme_title}&theme_id=${theme.theme_id}`} passHref>
                      <a title="상품 상세보기 링크(제목 클릭)" className="block text-center my-2 font-bold hover:text-blue-600">
                        {theme.theme_title}
                      </a>
                    </Link>
                    <em className="text-sm">{theme.theme_dscrp}</em>
                  </li>
                )
              })}
            </ul>
          </>
        ) : null}
      </div>
    </div>
  )
}

Themes.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
