import useIsMobile from '@components/common/custom/isMobile'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { forwardRef } from 'react'
import { useRecoilValue } from 'recoil'
import { isOpenMobileSidebarSelector } from 'state/atoms'

function MobileHeaderSidebar(
  props: {},
  sidebarRef: React.LegacyRef<HTMLUListElement> | undefined
) {
  const { data: session, status } = useSession()

  const isMobile = useIsMobile()

  const isOpenBars = useRecoilValue(isOpenMobileSidebarSelector)

  return (
    <div className={isOpenBars ? '' : 'relative overflow-hidden'}>
      <aside
        className={`mobile-header-sidebar shadow-md ${
          isOpenBars ? 'active' : ''
        }`}
      >
        <div className="mobile-header-sidebar-items flex flex-col">
          {session && status == 'authenticated' ? (
            <ul ref={sidebarRef}>
              <li>
                <Link href="/mypage">
                  <a className="relative">마이페이지</a>
                </Link>
              </li>
              <li>
                <Link
                  href={
                    isMobile
                      ? `/mobile/mypage/viewed_products`
                      : `/mypage/viewed_products`
                  }
                >
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
      </aside>
      <style jsx>{`
        .mobile-header-sidebar {
          position: absolute;
          right: -180px;
          top: 73px;
          width: 180px;
          background-color: #3b3b3b;
          color: white;
          padding: 4px;
          z-index: 999;

          &.active {
            right: 0;
          }
        }

        .mobile-header-sidebar-items > ul > li {
          margin: 20px 3px;
        }
      `}</style>
    </div>
  )
}

export default forwardRef(MobileHeaderSidebar)
