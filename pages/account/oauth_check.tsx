import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import useUser from 'pages/api/query/useUser'
import crypto from 'crypto-js'
import * as common from '@components/common/event/CommonFunction'
import axiosRequest from 'pages/api/axios'
import { useRouter } from 'next/router'
import { UserOAuthSubmitT } from 'types'

export async function getServerSideProps(context: any) {
  return {
    props: context.query,
  }
}

export default function OauthCheck(props: { provider: string }) {
  const session = useSession()

  const router = useRouter()

  const handleClickNewAccount = () => {
    if (
      session &&
      session.data &&
      session.data.user &&
      session.data.user.email &&
      session.data.user.name
    ) {
      let userInfo: UserOAuthSubmitT = {
        email: session.data.user.email,
        pw: '',
        nickname: session.data.user.name,
        provider: props.provider,
      }

      const secretKey = process.env.NEXT_PUBLIC_CRYPT_KEY
      if (secretKey !== undefined) {
        userInfo.pw = crypto
          .HmacSHA512(common.RandomPasswordIssuance(), secretKey)
          .toString()
      } else {
        alert('secretKey is undefined')
        return false
      }

      axiosRequest(
        'post',
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/create-account`,
        userInfo
      )
        .then((response) => {
          if (response?.status === 200) {
            alert('회원가입되었습니다.')
            router.push({
              pathname: '/',
              query: { onConnect: userInfo.provider },
            })
          }
        })
        .catch((error) => {
          console.log(error)
          alert('회원가입이 실패하였습니다.\r고객센터에 문의해주시기 바랍니다.')
          return false
        })
    } else {
      alert(
        '세션 정보를 가져올 수 없습니다.\r일시적인 문제일 수도 있으니 재시도 해주시기 바랍니다.\r만약 지금과 같은 상황이 계속 발생한다면\r고객센터에 문의해주시기 바랍니다.'
      )
      return false
    }
  }

  return (
    <div className="h-full bg-gray-200">
      <div className="flex justify-center items-center">
        <div className="login-box">
          <Link href="/">
            <a title="홈페이지로 이동 링크">
              <Image
                src="/main.svg"
                width="50px"
                height="50px"
                alt="메인으로"
              />
            </a>
          </Link>
          <h1 className="text-3xl">Account</h1>

          <div className="flex flex-col text-center">
            <p className="text-2xl">회원가입된 계정이 없습니다.</p>
            <br />
            <p>
              회원가입 후 로그인을 연동하여 다음 로그인 시<br />
              해당 페이지 없이 진행하실 수 있습니다.
            </p>
          </div>

          <button
            type="button"
            title="OAuth 계정으로 회원가입 제출"
            className="login-btn-credential"
            onClick={handleClickNewAccount}
          >
            회원가입
          </button>
          <button
            type="button"
            onClick={() => {
              signOut()
            }}
          >
            로그아웃
          </button>
        </div>
      </div>

      <style jsx>{`
        .login-box {
          min-width: 800px;
          vertical-align: middle;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;

          > * {
            margin: 8px 0px;
          }

          input {
            width: 500px;
            height: 35px;
            border: solid gray 1px;
            display: inline-block;
            padding: 5px;
          }
          button.login-btn-credential {
            margin-top: 17px;
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
            min-width: 500px;
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
        }
      `}</style>
    </div>
  )
}
