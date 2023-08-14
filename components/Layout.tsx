import { useRouter } from 'next/router'
import React, { ReactElement, useRef } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { isOpenMobileSidebarSelector, mypageListSelector } from 'state/atoms'

import Banner from './Banner'
import ButtonScrollTop from './ButtonScrollTop'
import Contents from './Contents'
import Footer from './Footer'
import Header from './Header'
import Helmet from './Helmet'
import Navbar from './NavigationBar'
import useIsMobile from './common/custom/isMobile'
import MobileHeader from './mobile/Header'
import SidebarMyPage from './sidebar/SidebarMyPage'

export default function Layout({ children }: React.PropsWithChildren): ReactElement {
  const router = useRouter()

  const isMobile = useIsMobile()

  const mypageListObj = useRecoilValue(mypageListSelector)

  const [isOpenBars, setIsOpenBars] = useRecoilState(isOpenMobileSidebarSelector)

  const sidebarRef = useRef(null)

  const handleClickOut = (event: React.MouseEvent<HTMLDivElement>) => {
    if (sidebarRef.current !== event.target && isOpenBars) {
      setIsOpenBars(false)
    }
  }

  return (
    <div className="flex flex-col h-auto relative" onClick={(event) => handleClickOut(event)}>
      <Helmet pathname={router.pathname.slice(1, router.pathname.length)}></Helmet>
      {!isMobile && <Banner />}
      {isMobile ? <MobileHeader sidebarRef={sidebarRef} /> : <Header />}
      {router.pathname.indexOf('mypage') > -1 || router.pathname.indexOf('order') > -1 ? (
        <div className="px-16">
          <Navbar />
          <div className="py-4 flex">
            <SidebarMyPage />
            <div className="w-screen min-h-[76vh]">
              <h1 className="text-2xl font-bold mb-3">
                {router.pathname.indexOf('mypage') > -1 ? (router.pathname === '/mypage' ? '마이페이지' : mypageListObj[router.pathname.slice(8, router.pathname.length)]) : '주문 & 배송'}
              </h1>
              <hr className="border-black border-2" />
              <Contents propChildren={children}></Contents>
            </div>
          </div>
        </div>
      ) : (
        <Contents propChildren={children}></Contents>
      )}
      <Footer />
      <ButtonScrollTop />
    </div>
  )
}
