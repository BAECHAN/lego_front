import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default function HomeIconLink() {
  return (
    <Link href="/" passHref>
      <a title="홈페이지로 이동 링크" className="mx-[10px]">
        <Image src="/main.svg" width="50px" height="50px" alt="메인으로" />
      </a>
    </Link>
  )
}
