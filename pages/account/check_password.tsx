import Layout from '@components/Layout'
import Link from 'next/link'
import Image from 'next/image'

import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import crypto from 'crypto-js'
import axiosRequest from 'pages/api/axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useSession } from 'next-auth/react'
import { useRecoilValue } from 'recoil'
import { passwordEyeSelector } from 'state/atoms'
import FontAwesomeEye from '@components/FontAwesomeEye'

export default function CheckPassword() {
  const { data: session, status } = useSession()

  const router = useRouter()

  const [password, setPassword] = useState('')

  const passwordType = useRecoilValue(passwordEyeSelector)

  const pwRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (
      session &&
      session.user &&
      session.user.email &&
      status == 'authenticated'
    ) {
      let password = e.currentTarget.password.value

      const secretKey = process.env.NEXT_PUBLIC_CRYPT_KEY
      if (secretKey !== undefined) {
        password = crypto.HmacSHA512(password, secretKey).toString()
      } else {
        alert('secretKey is undefined')
        return false
      }

      const param = {
        email: session.user.email,
        password,
      }

      axiosRequest(
        'post',
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/password-chk`,
        param
      )
        .then((response) => {
          const data = response?.data

          if (data.result == 1) {
            router.push(
              `/account/reset_password?email=${param.email}&token=${data.token}&callbackPage=user_info`
            )
          } else if (data.result == 0) {
            alert('비밀번호가 일치하지 않습니다.')
            pwRef.current?.focus()
            return false
          } else if (data.result == -1) {
            alert(
              '토큰 생성에 실패하였습니다.\r고객센터에 문의하시기 바랍니다.'
            )
            return false
          } else {
            alert(
              '비밀번호 확인을 실패하였습니다.\r고객센터에 문의해주시기 바랍니다.'
            )
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
    pwRef.current ? pwRef.current.focus() : null
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
            <label>
              기존 비밀번호 입력
              <br />
              <input
                type={passwordType}
                title="기존 비밀번호 입력란"
                name="password"
                id="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                ref={pwRef}
              />
              <FontAwesomeEye />
            </label>

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
