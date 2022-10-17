import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import Helmet from './Helmet'
import Banner from './Banner'
import Header from './Header'
import Footer from './Footer'
import ButtonScrollTop from './ButtonScrollTop'

export default function Layout({
  children,
}: React.PropsWithChildren): ReactElement {
  const router = useRouter()

  return (
    <div className="flex flex-col h-auto relative">
      <Helmet
        pathname={router.pathname.slice(1, router.pathname.length)}
      ></Helmet>
      <Banner />
      <Header />
      <div className="overflow-hidden relative">{children}</div>
      <Footer />
      <ButtonScrollTop />
    </div>
  )
}
