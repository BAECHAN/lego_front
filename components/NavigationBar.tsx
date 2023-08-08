import Link from 'next/link'
import { useRouter } from 'next/router'
import FontAwesomeAngleRight from './FontAwesomeAngleRight'
import { useRecoilValue } from 'recoil'
import { mypageListSelector, themeSelector } from 'state/atoms'
import React, { Fragment } from 'react'

export default function NavigationBar() {
  const router = useRouter()

  const [home, series, theme, mypage, order] = ['홈', '시리즈별', useRecoilValue(themeSelector), '마이페이지', '주문하기']

  const mypageListObj = useRecoilValue(mypageListSelector)

  return (
    <nav className="p-3">
      {router.pathname === '/' ? (
        <strong>{home}</strong>
      ) : (
        <Link href="/" passHref>
          <a>{home}</a>
        </Link>
      )}

      {router.pathname === '/mypage' && (
        <>
          <FontAwesomeAngleRight />
          <strong>{mypage}</strong>
        </>
      )}

      {Object.keys(mypageListObj).map((key) => {
        return (
          router.pathname.indexOf(`/mypage/${key}`) > -1 && (
            <Fragment key={key}>
              <FontAwesomeAngleRight />
              <Link href={`/mypage`} passHref>
                <a>{mypage}</a>
              </Link>

              <FontAwesomeAngleRight />
              <strong>{mypageListObj[key]}</strong>
            </Fragment>
          )
        )
      })}

      {router.pathname.startsWith('/order') && (
        <>
          <FontAwesomeAngleRight />
          <Link href={`/mypage`} passHref>
            <a>{mypage}</a>
          </Link>

          <FontAwesomeAngleRight />
          <Link href={`/mypage/cart`} passHref>
            <a>장바구니</a>
          </Link>

          <FontAwesomeAngleRight />
          <strong>{order}</strong>
        </>
      )}

      {router.pathname === '/themes' && (
        <>
          <FontAwesomeAngleRight />
          <strong>{series}</strong>
        </>
      )}

      {router.pathname === '/themes/[theme_title_en]' && (
        <>
          <FontAwesomeAngleRight />
          <Link href={`/themes`} passHref>
            <a>{series}</a>
          </Link>

          <FontAwesomeAngleRight />
          <strong>{theme.theme_title}</strong>
        </>
      )}

      {router.pathname === '/products/[product_number]' && (
        <>
          <FontAwesomeAngleRight />
          <Link href={`/themes`} passHref>
            <a>{series}</a>
          </Link>

          <FontAwesomeAngleRight />
          <Link href={`/themes/${theme.theme_title_en}?theme_title=${theme.theme_title}&theme_id=${theme.theme_id}`} passHref>
            <a>{theme.theme_title}</a>
          </Link>

          <FontAwesomeAngleRight />
          <strong>{router.query.title}</strong>
        </>
      )}

      <style jsx>{`
        a {
          color: #006db7;

          :hover {
            text-decoration: underline;
            cursor: pointer;
          }
        }
      `}</style>
    </nav>
  )
}
