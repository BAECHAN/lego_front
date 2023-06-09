import Link from 'next/link'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="flex items-center p-3 text-xl bg-yellow-400">
      <Link href="/">
        <a>
          <Image src="/main.svg" width="50px" height="50px" alt="메인으로" />
        </a>
      </Link>
      <Link href="/themes">
        <a>레고 제품 쇼핑</a>
      </Link>
      <div className="flex-grow" />

      {session && status == 'authenticated' ? (
        <div className="flex space-x-4">
          <span className="relative top-[-1px]">{session.user?.name}님</span>
          <Link href="/mypage">
            <a className="relative top-[6px]">마이페이지</a>
          </Link>
          <div>|</div>
          <Link href="/mypage/viewed_products">
            <a className="relative top-[6px]">최근 본 상품</a>
          </Link>
          <div>|</div>
          <button onClick={() => signOut()}>로그아웃</button>
        </div>
      ) : (
        <>
          <button onClick={() => signIn()}>로그인</button>
          <Link href="/login/create_account">
            <a>회원가입</a>
          </Link>
        </>
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
          text-decoration: underline;
        }
      `}</style>
    </header>
  )
}
