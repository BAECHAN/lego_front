import Layout from '@components/Layout'
import Link from 'next/link'
import Image from 'next/image'

import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import crypto from 'crypto-js'
import axiosRequest from 'pages/api/axios'
import { useSession } from 'next-auth/react'
import InputPassword from '@components/common/input/InputPassword'

export default function CheckPassword() {
  const { data: session, status } = useSession()

  const router = useRouter()

  const [password, setPassword] = useState('')

  const passwordRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (
      session &&
      session.user &&
      session.user.email &&
      status == 'authenticated'
    ) {
      if (!password && passwordRef.current) {
        alert(`${passwordRef.current.title}을 확인해주시기 바랍니다.`)
        passwordRef.current.focus()
        return false
      }

      const secretKey = process.env.NEXT_PUBLIC_CRYPT_KEY
      let hashedPassword: string = ''

      if (secretKey) {
        hashedPassword = crypto.HmacSHA512(password, secretKey).toString()
      } else {
        throw new Error(`secretKey is undefined`)
      }

      const param = {
        email: session.user.email,
        pw: hashedPassword,
      }

      axiosRequest(
        'post',
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/password-chk`,
        param
      )
        .then((response) => {
          const data = response?.data

          if (Object.entries(data).length === 1) {
            router.push(
              `/account/reset_password?token=${data.token}&callbackPage=user_info`
            )
          } else {
            alert('비밀번호가 일치하지 않습니다.')
            passwordRef.current?.focus()
            return false
          }
        })
        .catch((error) => {
          console.log(error)
          alert(
            '비밀번호 확인을 실패하였습니다.\r고객센터에 문의해주시기 바랍니다.'
          )
          return false
        })
    } else {
      alert('회원정보를 불러오는 중입니다.\r나중에 다시 시도해주시기 바랍니다.')
      return false
    }
  }

  useEffect(() => {
    passwordRef.current ? passwordRef.current.focus() : null
  }, [])

  return (
    <div>
      <div className="flex justify-center items-center w-full bg-gray-200 h-[38rem]">
        <div className="h-full relative top-[10%]">
          <form name="loginForm" className="login-box" onSubmit={handleSubmit}>
            <Link href="/">
              <a>
                <Image
                  src="/main.svg"
                  width="50px"
                  height="50px"
                  alt="메인으로"
                />
              </a>
            </Link>
            <InputPassword
              password={password}
              setPassword={setPassword}
              ref={passwordRef}
            />

            <button
              type="submit"
              className="btn-common min-w-[330px] h-33 fs-14"
              title="기존 비밀번호 검사 버튼"
            >
              비밀번호 확인
            </button>
          </form>
        </div>
      </div>
      <style jsx>{`
        .login-box {
          min-width: 400px;
          vertical-align: middle;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;

          > label,
          button,
          Link {
            margin: 8px 0px;
          }

          input {
            width: 330px;
            height: 35px;
            display: inline-block;
            padding: 5px;
          }
        }

        .go-find-password {
          background-color: #66d3fa;
          color: #000;
          font-weight: 700;
          font-size: 25px;
          text-align: center;
          margin-top: 20px;
          :hover {
            background-color: #000;
            color: #fff;
          }
        }
      `}</style>
    </div>
  )
}
CheckPassword.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
