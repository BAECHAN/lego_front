import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

export default function ButtonLoginKakao() {
  const loginKakao = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await signIn('kakao')
  }

  return (
    <button onClick={loginKakao} className="flex justify-center relative left-9">
      <Image src="/kakao_login_medium_wide.png" width="328px" height="50px" alt="카카오계정으로 로그인" quality={100}></Image>
      <style jsx>{`
        button {
          margin-bottom: 20px;
          &:hover {
            cursor: pointer;
            position: relative;
            top: 3px;
          }
        }
      `}</style>
    </button>
  )
}
