import Link from 'next/link'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import FontAwesomeMobileBars from '@components/FontAwesomeMobileBars'
import { forwardRef, useCallback, useEffect, useState } from 'react'
import MobileHeaderSidebar from './HeaderSidebar'
import { useRouter } from 'next/router'
import { isOpenMobileSidebarSelector } from 'state/atoms'
import { useRecoilState } from 'recoil'

export default function MobileHeader(props: {
  sidebarRef: React.MutableRefObject<null>
}) {
  const [isOpenBars, setIsOpenBars] = useRecoilState(
    isOpenMobileSidebarSelector
  )

  const router = useRouter()

  useEffect(() => {
    // 라우팅 발생 시 함수 실행
    router.events.on('routeChangeComplete', () => {
      setIsOpenBars(false) // 라우팅이 발생하면 isOpenBars를 초기화
    })
  }, [router.events, setIsOpenBars])

  return (
    <header className="flex items-center p-3 bg-yellow-400">
      <Link href="/">
        <a>
          <Image src="/main.svg" width="50px" height="50px" alt="메인으로" />
        </a>
      </Link>
      <Link href="/themes">
        <a>쇼핑하기</a>
      </Link>
      <div className="flex-grow" />

      <button onClick={() => setIsOpenBars(!isOpenBars)}>
        <FontAwesomeMobileBars />
      </button>

      <MobileHeaderSidebar ref={props.sidebarRef} />

      <style jsx>{`
        header {
          font-size: 20px;
          line-height: 16px;
        }

        a,
        button {
          margin: 0px 10px;
        }

        a:hover,
        button:hover {
          font-weight: 700;
          text-decoration: underline;
        }
      `}</style>
    </header>
  )
}
