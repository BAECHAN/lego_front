import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

export default function ButtonLoginGoogle() {
  const loginGoogle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await signIn('google')
  }

  return (
    <button onClick={loginGoogle} className="flex justify-center relative left-8">
      <Image src="/btn_google_signin_light_normal_web.png" width="335px" height="50px" alt="구글계정으로 로그인" quality={100}></Image>
      <style jsx>{`
        button {
          margin-bottom: 20px;
          :hover {
            cursor: pointer;
            position: relative;
            top: 3px;
          }
        }
      `}</style>
    </button>
  )
}
