import Link from 'next/link'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import FontAwesomeMobileBars from '@components/FontAwesomeMobileBars'
import { useState } from 'react'
import MobileHeaderSidebar from './HeaderSidebar'

export default function MobileHeader() {
  const { data: session, status } = useSession()

  const [isOpenBars, setIsOpenBars] = useState(false)

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
        <FontAwesomeMobileBars isOpenBars={isOpenBars} />
      </button>

      <MobileHeaderSidebar isOpenBars={isOpenBars} />

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
