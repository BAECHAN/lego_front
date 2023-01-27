import Link from 'next/link'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Header() {
  const { data: session } = useSession()

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
      {session ? (
        <div className="flex space-x-4">
          <span>{session.user?.name}님</span>
          <button type="button">마이페이지</button>
          <div />
          <div />
          <button onClick={() => signOut()}>로그아웃</button>
        </div>
      ) : (
        <button onClick={() => signIn()}>로그인</button>
      )}

      <style jsx>{`
        a,
        button {
          margin: 0px 10px;
          line-height: 15px;
        }
        a:hover,
        button:hover {
          font-weight: 700;
        }
      `}</style>
    </header>
  )
}
