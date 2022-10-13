import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import Helmet from './Helmet'
import Banner from './Banner'
import Header from './Header'
import Footer from './Footer'
import ScrollTopButton from './ScrollTopButton'

export default function Layout({
  children,
}: React.PropsWithChildren): ReactElement {
  const router = useRouter()

  return (
    <div>
      <Helmet
        pathname={router.pathname.slice(1, router.pathname.length)}
      ></Helmet>
      <Banner />
      <Header />
      <div>{children}</div>
      <Footer />
      <ScrollTopButton />
    </div>
  )
}
