import Layout from '@components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import FontAwesomeAsterisk from '@components/FontAwesomeAsterisk'

import React, { ChangeEvent, useEffect, useState } from 'react'
import { InputRegExpT } from 'types'
import axios from 'axios'
import Router, { useRouter } from 'next/router'
import crypto from 'crypto-js'
import axiosRequest from 'pages/api/axios'

export default function ResetPassword() {
  const router = useRouter()

  const email = router.query.email
  const token = router.query.token

  const [isExpired, setIsExpired] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (router.isReady) {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/token-chk?email=${email}&token=${token}`
      axios
        .get(url, {
          headers: { 'Content-Type': `application/json; charset=utf-8` },
        })
        .then((response) => {
          response.data.result.expired
            ? setIsExpired(true)
            : setIsExpired(false)
          setIsLoading(false)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [email, router.isReady, token])

  const [inputs, setInputs] = useState({
    pw: '',
    pwChk: '',
  })

  const [inputsPass, setInputsPass] = useState({
    pwPass: false,
    pwChkPass: false,
  })

  let { pw, pwChk } = inputs

  const inputRegExp: InputRegExpT = {
    pw: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
  }

  const isPass = (state: boolean, e: ChangeEvent<HTMLInputElement>): void => {
    const { name } = e.target

    e.target &&
      setInputsPass({
        ...inputsPass,
        [`${name}Pass`]: state,
      })
  }

  const [disabledSubmit, setDisabledSubmit] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target

    if (name == 'pw' || name == 'pwChk') {
      setInputs({
        ...inputs,
        [name]: value.trim(),
        // [name]: crypto.createChi(value.trim(),"123").toString()
      })
    } else {
      setInputs({
        ...inputs,
        [name]: value.trim(),
      })
    }

    if (value.trim().length > 0) {
      const regExp = inputRegExp[name]

      if (name == 'pw') {
        if (regExp.test(value)) {
          if (pwChk.length > 0) {
            if (pw != pwChk) {
              setInputsPass({
                pwPass: true,
                pwChkPass: false,
              })
            } else {
              setInputsPass({
                pwPass: true,
                pwChkPass: true,
              })
            }
          } else {
            isPass(true, e)
          }
        } else {
          isPass(false, e)
        }
      } else if (name == 'pwChk') {
        if (pw == e.currentTarget.value) {
          isPass(true, e)
        } else {
          isPass(false, e)
        }
      } else {
        alert('검증할 수 없는 입력란입니다.')
        return false
      }
    } else {
      isPass(false, e)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setDisabledSubmit(true)
    event.preventDefault()

    let hasFalseIndex = Object.values(inputsPass).indexOf(false)

    if (hasFalseIndex >= 0) {
      if (hasFalseIndex == 0) {
        alert('비밀번호를 확인해주시기 바랍니다.')
        document.getElementById('pw')?.focus()
      } else if (hasFalseIndex == 1) {
        alert('비밀번호확인을 확인해주시기 바랍니다.')
        document.getElementById('pwChk')?.focus()
      }
      setDisabledSubmit(false)
      return false
    }

    const secretKey = process.env.NEXT_PUBLIC_CRYPT_KEY
    if (secretKey !== undefined) {
      pw = crypto.HmacSHA512(pw, secretKey).toString()
    } else {
      alert('secretKey is undefined')
      return false
    }

    if (typeof email == 'string') {
      const param = {
        email,
        pw,
      }

      axiosRequest(
        'patch',
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/update-password`,
        param
      )
        .then((response) => {
          if (response?.status === 200) {
            if (router.query.callbackPage == 'user_info') {
              alert(
                '비밀번호가 변경되었습니다.\r회원 정보 페이지로 이동합니다.'
              )
              router.push('/mypage/user_info')
            } else {
              alert('비밀번호가 변경되었습니다.\r로그인 페이지로 이동합니다.')
              Router.push('/login')
            }
          }
        })
        .catch((error) => {
          console.log(error)
          alert(
            '비밀번호 변경이 실패하였습니다.\r고객센터에 문의해주시기 바랍니다.'
          )
          setDisabledSubmit(false)
          return false
        })
    }
  }

  return (
    <div>
      <div className="flex justify-center items-center w-full bg-gray-200 h-[38rem]">
        <div className="h-full relative top-[10%]">
          {!isLoading ? (
            !isExpired ? (
              <form
                name="loginForm"
                className="login-box"
                onSubmit={handleSubmit}
              >
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
                  새 비밀번호 입력
                  <FontAwesomeAsterisk />
                  <br />
                  <input
                    type="password"
                    id="pw"
                    name="pw"
                    className={
                      pw.length == 0
                        ? 'border-gray-500 border-2 border-solid'
                        : inputsPass.pwPass
                        ? 'border-green-500 border-2 border-solid'
                        : 'border-red-500 border-2 border-solid'
                    }
                    title="새 비밀번호 입력"
                    value={pw}
                    onChange={handleChange}
                    onBlur={handleChange}
                    placeholder="8~16자 영문 대 소문자, 숫자, 특수문자"
                    autoComplete="off"
                  />
                </label>
                {inputsPass.pwPass || pw.length == 0 ? (
                  ''
                ) : (
                  <span className="text-red-500 ml-4">
                    8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.
                  </span>
                )}
                <label>
                  새 비밀번호 확인
                  <FontAwesomeAsterisk />
                  <br />
                  <input
                    type="password"
                    id="pwChk"
                    name="pwChk"
                    className={
                      pwChk.length == 0
                        ? 'border-gray-500 border-2 border-solid'
                        : inputsPass.pwChkPass
                        ? 'border-green-500 border-2 border-solid'
                        : 'border-red-500 border-2 border-solid'
                    }
                    title="새 비밀번호 확인"
                    value={pwChk}
                    onChange={handleChange}
                    onBlur={handleChange}
                    placeholder="8~16자 영문 대 소문자, 숫자, 특수문자"
                    autoComplete="off"
                  />
                </label>
                {pwChk.length == 0 ? (
                  ''
                ) : inputsPass.pwChkPass ? (
                  ''
                ) : (
                  <span className="text-red-500 self-start ml-4">
                    비밀번호가 일치하지 않습니다.
                  </span>
                )}
                <button
                  type="submit"
                  className="btnResetPassword"
                  disabled={disabledSubmit}
                  title="비밀번호 변경하기"
                >
                  비밀번호 변경하기
                </button>
              </form>
            ) : (
              <div className="flex flex-col">
                <p className="text-2xl">
                  인증시간이 만료되었습니다.
                  <br /> 처음부터 다시 진행해주시기 바랍니다.
                </p>
                <Link href="/login/find_password">
                  <a className="go-find-password ">비밀번호 찾기</a>
                </Link>
              </div>
            )
          ) : null}
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
ResetPassword.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
