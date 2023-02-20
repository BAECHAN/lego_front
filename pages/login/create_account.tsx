import Layout from '@components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import FontAwesomeAsterisk from '@components/FontAwesomeAsterisk'

import React, { ChangeEvent, useState } from 'react'
import { InputRegExpT, UserSubmitT } from 'types'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import Router from 'next/router'
import crypto from 'crypto-js'

export default function CreateAccount() {
  const [inputs, setInputs] = useState<UserSubmitT>({
    email: '',
    pw: '',
    pwChk: '',
    nickname: '',
  })

  const [inputsPass, setInputsPass] = useState({
    emailPass: false,
    pwPass: false,
    pwChkPass: false,
    nicknamePass: false,
  })

  let { email, pw, pwChk, nickname } = inputs

  const inputRegExp: InputRegExpT = {
    email:
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    pw: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
    nickname: /^(?=.*[a-z0-9A-Z가-힣])[a-z0-9A-Z가-힣]{2,16}$/,
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
  const [submitResult, setSubmitResult] = useState(0)

  const [isEmailOverlap, setIsEmailOverlap] = useState(false)

  const handleBlurEmail = () => {
    axios
      .get('http://localhost:5000/api/email-chk?email=' + email)
      .then((response) => {
        response.data.result == 1
          ? setIsEmailOverlap(true)
          : setIsEmailOverlap(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }
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

      if (name == 'email') {
        if (regExp.test(value)) {
          isPass(true, e)
        } else {
          isPass(false, e)
        }
      } else if (name == 'pw') {
        if (regExp.test(value)) {
          if (pwChk.length > 0) {
            if (pw != pwChk) {
              setInputsPass({
                ...inputsPass,
                pwPass: true,
                pwChkPass: false,
              })
            } else {
              setInputsPass({
                ...inputsPass,
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
      } else if (name == 'nickname') {
        if (regExp.test(value)) {
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
        alert('이메일 주소를 확인해주시기 바랍니다.')
        document.getElementById('email')?.focus()
      } else if (hasFalseIndex == 1) {
        alert('비밀번호를 확인해주시기 바랍니다.')
        document.getElementById('pw')?.focus()
      } else if (hasFalseIndex == 2) {
        alert('비밀번호확인을 확인해주시기 바랍니다.')
        document.getElementById('pwChk')?.focus()
      } else if (hasFalseIndex == 3) {
        alert('닉네임을 확인해주시기 바랍니다.')
        document.getElementById('nickname')?.focus()
      }
      setDisabledSubmit(false)
      return false
    } else {
      if (isEmailOverlap) {
        alert(
          '이미 가입된 이메일입니다.\r로그인 하시거나 비밀번호가 기억이 나지 않으시다면 비밀번호찾기를 이용해주시기 바랍니다.'
        )
        document.getElementById('email')?.focus()
        setDisabledSubmit(false)
        return false
      }
    }

    const secretKey = process.env.NEXT_PUBLIC_CRYPT_KEY
    if (secretKey !== undefined) {
      pw = crypto.HmacSHA512(pw, secretKey).toString()
    } else {
      alert('secretKey is undefined')
      return false
    }

    const userInfo = {
      email,
      pw,
      pwChk,
      nickname,
    }

    createAccountAPI.mutate(userInfo)
    setDisabledSubmit(false)
  }

  const createAccountAPI = useMutation(
    (userInfo: UserSubmitT) =>
      axios.post(
        'http://localhost:5000/api/create-account',
        JSON.stringify(userInfo),
        {
          headers: { 'Content-Type': `application/json; charset=utf-8` },
        }
      ),
    {
      onSuccess: () => {
        alert('회원가입되었습니다.\r로그인 페이지로 이동합니다.')
        Router.push('/login')
        //location.href = '/login'
      },
      onError: (error) => {
        console.log(error)
        alert('회원가입이 실패하였습니다.')
        return false
      },
    }
  )

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
              이메일 주소
              <FontAwesomeAsterisk />
              <br />
              <input
                type="text"
                id="email"
                name="email"
                className={
                  email.length == 0
                    ? 'border-gray-500 border-2 border-solid'
                    : inputsPass.emailPass && !isEmailOverlap
                    ? 'border-green-500 border-2 border-solid'
                    : 'border-red-500 border-2 border-solid'
                }
                title="이메일"
                value={email}
                onChange={handleChange}
                onBlur={handleBlurEmail}
                placeholder="예) lego@lego.co.kr"
                autoComplete="off"
              />
            </label>
            {inputsPass.emailPass || email.length == 0 ? (
              isEmailOverlap ? (
                <>
                  <span className="text-red-500 self-start ml-4">
                    이미 가입된 이메일입니다.
                  </span>
                  <div className="ml-10">
                    <Link href="/login">
                      <a className="text-sm hover:underline hover:text-blue-600">
                        로그인
                      </a>
                    </Link>
                    <span className="mx-5">|</span>
                    <Link href="/find_password">
                      <a className="text-sm hover:underline hover:text-blue-600">
                        비밀번호찾기
                      </a>
                    </Link>
                  </div>
                </>
              ) : (
                ''
              )
            ) : (
              <span className="text-red-500 self-start ml-4">
                이메일 양식이 맞지 않습니다.
              </span>
            )}
            <label>
              비밀번호
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
                title="비밀번호"
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
              비밀번호확인
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
                title="비밀번호확인"
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
            <label>
              닉네임
              <FontAwesomeAsterisk />
              <br />
              <input
                type="text"
                id="nickname"
                name="nickname"
                className={
                  nickname.length == 0
                    ? 'border-gray-500 border-2 border-solid'
                    : inputsPass.nicknamePass
                    ? 'border-green-500 border-2 border-solid'
                    : 'border-red-500 border-2 border-solid'
                }
                title="닉네임"
                value={nickname}
                onChange={handleChange}
                placeholder="2글자 이상 한글 또는 영문"
                autoComplete="off"
              />
            </label>
            {inputsPass.nicknamePass || nickname.length == 0 ? (
              ''
            ) : (
              <span className="text-red-500 self-start ml-4">
                닉네임 양식이 맞지 않습니다.
              </span>
            )}
            <button
              type="submit"
              className="btnCreateAccount"
              disabled={disabledSubmit}
            >
              회원가입
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

        .btnCreateAccount {
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
      `}</style>
    </div>
  )
}
CreateAccount.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
