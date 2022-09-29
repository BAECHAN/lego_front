import Link from 'next/link'
import { useRouter } from 'next/router'
import FontAwesomeAngleRight from './FontAwesomeAngleRight'

export default function Navbar() {
  const router = useRouter()
  const [home, series] = ['홈', '시리즈별']
  return (
    <div className="p-3">
      {router.pathname === '/' ? (
        <span>{home}</span>
      ) : (
        <Link href="/">
          <a>{home}</a>
        </Link>
      )}
      <FontAwesomeAngleRight />
      {router.pathname === '/themes' ? (
        <span>{series}</span>
      ) : (
        <Link href="/themes">
          <a>{series}</a>
        </Link>
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
