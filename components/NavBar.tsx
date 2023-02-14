import Link from 'next/link'
import { useRouter } from 'next/router'
import FontAwesomeAngleRight from './FontAwesomeAngleRight'
import { ObjT_Str, ProductT, ThemeT } from 'types'
import { useRecoilValue } from 'recoil'
import { themeSelector } from 'state/atoms'

export default function Navbar(prop: { productInfo?: ProductT }) {
  const router = useRouter()

  const [home, series, theme, productInfo, mypage] = [
    '홈',
    '시리즈별',
    useRecoilValue(themeSelector),
    prop?.productInfo,
    '마이페이지',
  ]

  const mypageObj: ObjT_Str = {
    orders: '주문 내역 조회',
    cart: '장바구니',
    user_info: '회원 정보',
    coupon: '쿠폰 조회',
    viewed_products: '최근 본 상품',
    wish_list: '좋아요',
  }

  return (
    <div className="p-3">
      {router.pathname === '/' ? (
        <span>{home}</span>
      ) : (
        <Link href="/">
          <a>{home}</a>
        </Link>
      )}

      {router.pathname === '/mypage' ? (
        <>
          <FontAwesomeAngleRight />
          <span>{mypage}</span>
        </>
      ) : null}

      {Object.keys(mypageObj).map((key) => {
        return router.pathname.indexOf(`/mypage/${key}`) > -1 ? (
          <p key={key} className="inline">
            <FontAwesomeAngleRight />
            <Link href={`/mypage`}>
              <a>{mypage}</a>
            </Link>

            <FontAwesomeAngleRight />
            <span>{mypageObj[key]}</span>
          </p>
        ) : null
      })}

      {router.pathname === '/themes' ? (
        <>
          <FontAwesomeAngleRight />
          <span>{series}</span>
        </>
      ) : null}

      {router.pathname === '/themes/[theme_title_en]' ? (
        <>
          <FontAwesomeAngleRight />
          <Link href={`/themes`}>
            <a>{series}</a>
          </Link>

          <FontAwesomeAngleRight />
          <span>{theme?.theme_title}</span>
        </>
      ) : null}

      {router.pathname === '/products/[product_number]' ? (
        <>
          <FontAwesomeAngleRight />
          <Link href={`/themes`}>
            <a>{series}</a>
          </Link>

          <FontAwesomeAngleRight />
          <Link
            href={`/themes/${theme.theme_title_en}?theme_title=${theme?.theme_title}&theme_id=${theme?.theme_id}`}
          >
            <a>{theme?.theme_title}</a>
          </Link>

          <FontAwesomeAngleRight />
          <span>{productInfo?.title}</span>
        </>
      ) : null}

      <style jsx>{`
        a {
          color: #006db7;
        }
        a:hover {
          text-decoration: underline;
        }

        span {
          color: black;
          font-weight: 700;
        }
      `}</style>
    </div>
  )
}
