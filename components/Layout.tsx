import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import Helmet from './Helmet'
import Banner from './Banner'
import Header from './Header'
import Footer from './Footer'
import Contents from './Contents'
import ButtonScrollTop from './ButtonScrollTop'
import Navbar from './Navbar'
import SidebarMyPage from './SidebarMyPage'
import { ObjT_Str } from 'types'
import { useRecoilValue } from 'recoil'
import { mypageListSelector } from 'state/atoms'

export default function Layout({
  children,
}: React.PropsWithChildren): ReactElement {
  const router = useRouter()

  const mypageListObj = useRecoilValue(mypageListSelector)

  return (
    <div className="flex flex-col h-auto relative">
      <Helmet
        pathname={router.pathname.slice(1, router.pathname.length)}
      ></Helmet>
      <Banner />
      <Header />
      {router.pathname.indexOf('mypage') > -1 ||
      router.pathname.indexOf('order') > -1 ? (
        <div className="px-16">
          <Navbar />
          <div className="py-4 flex">
            <SidebarMyPage />
            <div className="w-screen">
              <h1 className="text-2xl font-bold mb-3">
                {router.pathname.indexOf('mypage') > -1
                  ? mypageListObj[
                      router.pathname.slice(8, router.pathname.length)
                    ]
                  : '주문 & 배송'}
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
