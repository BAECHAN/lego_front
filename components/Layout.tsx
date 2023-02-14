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

export default function Layout({
  children,
}: React.PropsWithChildren): ReactElement {
  const router = useRouter()

  console.log(router.pathname)

  return (
    <div className="flex flex-col h-auto relative">
      <Helmet
        pathname={router.pathname.slice(1, router.pathname.length)}
      ></Helmet>
      <Banner />
      <Header />
      {router.pathname.indexOf('mypage') > -1 ? (
        <div className="px-16">
          <Navbar />
          <div className="py-4 flex">
            <SidebarMyPage />
            <Contents propChildren={children}></Contents>
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
