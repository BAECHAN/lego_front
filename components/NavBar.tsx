import Link from 'next/link'
import { useRouter } from 'next/router'
import FontAwesomeAngleRight from './FontAwesomeAngleRight'

type Props = {
  currentPage? : string | string[] | undefined;
}

export default function Navbar(prop:Props) {

  const router = useRouter();
  const [home, series, theme] = ['홈', '시리즈별', prop.currentPage];

  return (
    <div className="p-3">
      {router.pathname === '/' ? (
        <span>{home}</span>
      ) : (
        <Link href="/">
          <a>{home}</a>
        </Link>
      )}
      
      {router.pathname === '/themes' ? (
        <>
          <FontAwesomeAngleRight />
          <span>{series}</span>
        </>
      ) : (
        <>
          <FontAwesomeAngleRight />
          <Link href="/themes">
            <a>{series}</a>
          </Link>
        </>
      )}
      

      {router.pathname === '/themes/[theme]' ? (
        <>
          <FontAwesomeAngleRight />
          <span>{theme}</span>
        </>
      ) : (
        <>
          <Link href={`/themes/${theme}`}>
            <a>{theme}</a>
          </Link>
        </>
      )}

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
