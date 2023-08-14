import crypto from 'crypto-js'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useRef, useState } from 'react'

import HomeIconLink from '@components/HomeIconLink'
import Layout from '@components/Layout'
import InputEmail from '@components/common/input/InputEmail'
import InputPassword from '@components/common/input/InputPassword'
import ButtonFindAccount from '@components/login/ButtonFindAccount'
import ButtonLoginGoogle from '@components/login/ButtonLoginGoogle'
import ButtonLoginKakao from '@components/login/ButtonLoginKakao'

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (email.trim() === '') {
      alert('이메일 주소를 입력해주세요.')
      emailRef.current?.focus()
      return false
    } else if (password.trim() === '') {
      alert('비밀번호를 입력해주세요.')
      passwordRef.current?.focus()
      return false
    }

    const secretKey = process.env.NEXT_PUBLIC_CRYPT_KEY

    if (secretKey !== undefined) {
      const hashedPassword = crypto.HmacSHA512(password, secretKey).toString()

      const response = await signIn('email-password-credential', {
        email,
        password: hashedPassword,
        redirect: false,
      })

      if (response !== undefined) {
        if (response.ok) {
          if (router.query.callbackUrl != undefined && router.query.callbackUrl.indexOf('account') < 0) {
            router.back()
          } else {
            router.push('/')
          }
        } else {
          if (response.status === 401) {
            alert('아이디 혹은 패스워드를 확인하세요.')
            setPassword('')
            passwordRef.current?.focus()
            return false
          }
        }
      }
    } else {
      alert('secretKey is undefined')
      return false
    }
  }

  return (
    <div>
      <div className="flex justify-center items-center w-full bg-gray-200 h-[44rem]">
        <div className="h-full relative top-[3%]">
          <form onSubmit={login} className="login-box">
            <HomeIconLink />

            <InputEmail email={email} setEmail={setEmail} ref={emailRef} />
            <InputPassword password={password} setPassword={setPassword} ref={passwordRef} />

            <button type="submit" title="로그인 버튼" className="btn-common min-w-[330px] h-33 fs-14">
              로그인
            </button>

            <div className="flex text-xs w-72 justify-between">
              <Link href="/login/create_account" passHref>
                <a title="회원가입 페이지로 이동" className="hover:underline">
                  회원가입
                </a>
              </Link>
              <div className="flex-grow" />
              <ButtonFindAccount type="email" />
              <ButtonFindAccount type="password" />
            </div>
          </form>

          <div className="sns-login-title">
            <span>SNS 계정으로 로그인</span>
          </div>
          <ButtonLoginKakao />
          <ButtonLoginGoogle />
        </div>
      </div>
      <style jsx>{`
        .sns-login-title {
          text-align: center;
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          border: 0;
          font: inherit;
          vertical-align: baseline;
          margin-bottom: 24px;
          color: #585252;

          span:after,
          span:before {
            content: '';
            display: inline-block;
            width: 32px;
            height: 1px;
            background-color: #585252;
            position: relative;
            top: -4px;
            margin: 0px 5px;
            transform: translateY(-50%);
          }
        }

        .login-box {
          width: 400px;
          vertical-align: middle;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;

          > * {
            margin: 8px 0px;
          }
        }
      `}</style>
    </div>
  )
}

Login.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
