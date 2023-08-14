import { useRouter } from 'next/router'
import React, { ReactElement, useRef } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { isOpenMobileSidebarSelector, mypageListSelector } from 'state/atoms'

import ButtonScrollTop from './ButtonScrollTop'
import Contents from './Contents'
import Footer from './Footer'
import Helmet from './Helmet'
import MobileHeader from './mobile/Header'
import ButtonBack from './mypage/ButtonBack'

export default function Layout({ children }: React.PropsWithChildren): ReactElement {
  const router = useRouter()

  const mypageListObj = useRecoilValue(mypageListSelector)

  const [isOpenBars, setIsOpenBars] = useRecoilState(isOpenMobileSidebarSelector)

  const sidebarRef = useRef(null)

  const handleClickOut = (event: React.MouseEvent<HTMLDivElement>) => {
    if (sidebarRef.current !== event.target && isOpenBars) {
      setIsOpenBars(false)
    }
  }

  return (
    <div className="flex flex-col relative" onClick={(event) => handleClickOut(event)}>
      <Helmet pathname={router.pathname.slice(1, router.pathname.length)} />
      <MobileHeader sidebarRef={sidebarRef} />
      <ButtonBack />
      <div className="w-screen min-h-[76vh]">
        <h1 className="text-2xl font-bold mb-3 text-center">
          {router.pathname.indexOf('mypage') > -1 ? (router.pathname === '/mypage' ? '마이페이지' : mypageListObj[router.pathname.slice(15, router.pathname.length)]) : '주문 & 배송'}
        </h1>
        <hr className="border-black border-2" />
        <Contents propChildren={children}></Contents>
      </div>
      <Footer />
      <ButtonScrollTop />
    </div>
  )
}
