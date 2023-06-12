import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export default function MobileHeaderSidebar(props: { isOpenBars: boolean }) {
  const { data: session, status } = useSession()

  return (
    <aside
      className={`mobile-header-sidebar shadow-md ${
        props.isOpenBars ? 'active' : ''
      }`}
    >
      <div className="mobile-header-sidebar-items flex flex-col">
        {session && status == 'authenticated' ? (
          <ul>
            <li>
              <Link href="/mypage">
                <a className="relative">마이페이지</a>
              </Link>
            </li>
            <li>
              <Link href="/mypage/viewed_products">
                <a className="relative">최근 본 상품</a>
              </Link>
            </li>
            <li>
              <button onClick={() => signOut()}>로그아웃</button>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <button onClick={() => signIn()}>로그인</button>
            </li>
            <li>
              <Link href="/login/create_account">
                <a>회원가입</a>
              </Link>
            </li>
          </ul>
        )}
      </div>

      <style jsx>{`
        .mobile-header-sidebar {
          position: absolute;
          right: -180px;
          top: 73px;
          width: 180px;
          background-color: red;
          padding: 4px;
          z-index: 999;

          transition: 0.5s;
          &.active {
            right: 0;
          }
        }

        .mobile-header-sidebar-items > ul > li {
          margin: 20px 3px;
        }
      `}</style>
    </aside>
  )
}
