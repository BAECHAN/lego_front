import { useRouter } from 'next/router'
import React, { ReactElement, useEffect, useState } from 'react'
import Helmet from './Helmet'
import MobileHeader from './mobile/Header'
import Footer from './Footer'
import Contents from './Contents'
import ButtonScrollTop from './ButtonScrollTop'
import ButtonBack from './mypage/ButtonBack'

export default function Layout({
  children,
}: React.PropsWithChildren): ReactElement {
  const router = useRouter()

  return (
    <div className="flex flex-col relative">
      <Helmet
        pathname={router.pathname.slice(1, router.pathname.length)}
      ></Helmet>
      <MobileHeader />
      <ButtonBack />
      <Contents propChildren={children}></Contents>
      <Footer />
      <ButtonScrollTop />
    </div>
  )
}
