import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

import HomeIconLink from './HomeIconLink'

export default function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="flex items-center p-3 bg-yellow-400">
      <HomeIconLink />
      <Link href="/themes" passHref>
        <a>레고 제품 쇼핑</a>
      </Link>
      <div className="flex-grow" />

      {session && status === 'authenticated' ? (
        <div className="flex desktop:space-x-4">
          <span className="relative">{session.user?.name}님</span>
          <Link href="/mypage" passHref>
            <a className="relative">마이페이지</a>
          </Link>
          <div>|</div>
          <Link href="/mypage/viewed_products" passHref>
            <a className="relative">최근 본 상품</a>
          </Link>
          <div>|</div>
          <button onClick={() => signOut()}>로그아웃</button>
        </div>
      ) : (
        <div className="">
          <button onClick={() => signIn()}>로그인</button>
          <Link href="/login/create_account" passHref>
            <a>회원가입</a>
          </Link>
        </div>
      )}

      <style jsx>{`
        header {
          font-size: 20px;
          line-height: 16px;

          @media (max-width: 768px) {
            font-size: 10px;
            white-space: nowrap;
          }
        }

        a,
        button {
          margin: 0px 10px;

          @media (max-width: 768px) {
            margin: 0px 5px;
          }

          :hover {
            font-weight: 700;
            text-decoration: underline;
          }
        }
      `}</style>
    </header>
  )
}
