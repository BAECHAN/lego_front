import { useRouter } from 'next/router'
import React, { ReactElement, useRef } from 'react'
import Helmet from './Helmet'
import MobileHeader from './mobile/Header'
import Footer from './Footer'
import Contents from './Contents'
import ButtonScrollTop from './ButtonScrollTop'
import ButtonBack from './mypage/ButtonBack'
import { isOpenMobileSidebarSelector } from 'state/atoms'
import { useRecoilState } from 'recoil'

export default function Layout({
  children,
}: React.PropsWithChildren): ReactElement {
  const router = useRouter()

  const [isOpenBars, setIsOpenBars] = useRecoilState(
    isOpenMobileSidebarSelector
  )

  const sidebarRef = useRef(null)

  const handleClickOut = (event: React.MouseEvent<HTMLDivElement>) => {
    if (sidebarRef.current !== event.target && isOpenBars) {
      setIsOpenBars(false)
    }
  }

  return (
    <div
      className="flex flex-col relative"
      onClick={(event) => handleClickOut(event)}
    >
      <Helmet pathname={router.pathname.slice(1, router.pathname.length)} />
      <MobileHeader sidebarRef={sidebarRef} />
      <ButtonBack />
      <Contents propChildren={children} />
      <Footer />
      <ButtonScrollTop />
    </div>
  )
}
