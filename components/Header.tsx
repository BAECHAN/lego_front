import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="flex items-center p-3 text-xl bg-yellow-400">
      <Link href="/">
        <a>
          <Image src="/main.svg" width="50px" height="50px" alt="메인으로" />
        </a>
      </Link>
      <Link href="/themes">
        <a>시리즈</a>
      </Link>
      <div className="flex-grow" />
      <Link href="/login">
        <a className="text-sm">로그인</a>
      </Link>

      <style jsx>{`
        a {
          margin: 0px 10px;
          line-height: 15px;
        }
        a:hover {
          font-weight: 700;
        }
      `}</style>
    </header>
  )
}
