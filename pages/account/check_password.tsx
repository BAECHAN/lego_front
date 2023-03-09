import Layout from '@components/Layout'
import Link from 'next/link'
import Image from 'next/image'

import React, { FormEvent, useEffect, useRef, useState } from 'react'
import Router, { useRouter } from 'next/router'
import crypto from 'crypto-js'
import axiosRequest from 'pages/api/axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useSession } from 'next-auth/react'

export default function CheckPassword() {
  const { data: session, status } = useSession()

  const [password, setPassword] = useState('')

  const [isShowPw, setIsShowPw] = useState(false)

  const router = useRouter()

  const pwRef = useRef<HTMLInputElement>(null)

  const handleClickEye = () => {
    setIsShowPw(!isShowPw)

    isShowPw
      ? pwRef.current?.setAttribute('type', 'password')
      : pwRef.current?.setAttribute('type', 'text')
  }

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

      axiosRequest('post', `http://localhost:5000/api/password-chk`, param)
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
              '토큰 생성에 실패하였습니다.\r관리자에게 문의하시기 바랍니다.'
            )
            return false
          } else {
            console.log(response?.status)
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
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                ref={pwRef}
              />
              {isShowPw ? (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  onClick={handleClickEye}
                  cursor="pointer"
                  className="w-5 relative ml-[304px] -mt-[26px]"
                ></FontAwesomeIcon>
              ) : (
                <FontAwesomeIcon
                  icon={faEye}
                  onClick={handleClickEye}
                  cursor="pointer"
                  className="w-5 relative ml-[304px] -mt-[26px]"
                ></FontAwesomeIcon>
              )}
            </label>

            <button
              type="submit"
              className="btnResetPassword"
              title="기존 비밀번호 체크"
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

        .btnResetPassword {
          box-sizing: border-box;
          outline: 0;
          border: 0;
          cursor: pointer;
          user-select: none;
          vertical-align: middle;
          -webkit-appearance: none;
          font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
          font-weight: 500;
          font-size: 0.875rem;
          letter-spacing: 0.02857em;
          text-transform: uppercase;
          min-width: 330px;
          padding: 6px 16px;
          border-radius: 4px;
          transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
            box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
            border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
            color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
          color: black;
          text-decoration: none;
          background-color: rgb(255, 207, 0);

          :hover,
          :focus {
            background-color: black;
            color: white;
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
