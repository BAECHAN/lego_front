import Layout from '@components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import FontAwesomeAsterisk from '@components/FontAwesomeAsterisk'
import { v1 } from 'uuid'

import React, { ChangeEvent, useState, useEffect } from 'react'
import { InputRegExpT, UserT, SubmitT } from 'types'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { atom, selector, useRecoilValue } from 'recoil'
import { resolve } from 'node:path/win32'

export default function CreateAccount() {
  const [inputs, setInputs] = useState<SubmitT>({
    email: '',
    pw: '',
    pwChk: '',
    nickname: '',
    result: 0,
  })

  const [inputsPass, setInputsPass] = useState({
    emailPass: false,
    pwPass: false,
    pwChkPass: false,
    nicknamePass: false,
  })

  const { email, pw, pwChk, nickname } = inputs

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

  const emailOverLapChk = () => {
    return new Promise((resolve, reject) => {
      axios
        .get('http://localhost:5000/api/getUserChk?email=' + email)
        .then((response) => {
          console.log(response.data)
          console.log(response.data.result == 1)
          response.data == 1 ? resolve('F') : resolve('T')
        })
        .catch((error) => {
          reject('F')
        })
    })
  }

  useEffect(() => {}, [inputs])

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name, style } = e.target

    setInputs({
      ...inputs,
      [name]: value.trim(),
    })

    console.log(inputs)

    if (value.trim().length > 0) {
      const regExp = inputRegExp[name]

      if (name == 'email') {
        if (regExp.test(value)) {
          console.log(email)
          let ddd = await emailOverLapChk()
          console.log(ddd)
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
        if (pw == pwChk) {
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

    console.log(emailOverLapChk)

    if (hasFalseIndex == 0) {
      alert('이메일 주소를 확인해주시기 바랍니다.')
      setDisabledSubmit(false)
      return false
    } else if (hasFalseIndex == 1) {
      alert('비밀번호를 확인해주시기 바랍니다.')
      setDisabledSubmit(false)
      return false
    } else if (hasFalseIndex == 2) {
      alert('비밀번호확인을 확인해주시기 바랍니다.')
      setDisabledSubmit(false)
      return false
    } else if (hasFalseIndex == 3) {
      alert('닉네임을 확인해주시기 바랍니다.')
      setDisabledSubmit(false)
      return false
    }

    await new Promise((response) => setTimeout(response, 1000))
    alert(`변경된 패스워드: ${pw}`)
    setDisabledSubmit(false)
  }

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
                name="email"
                className={
                  email.length == 0
                    ? 'border-gray-500 border-2 border-solid'
                    : inputsPass.emailPass
                    ? 'border-green-500 border-2 border-solid'
                    : 'border-red-500 border-2 border-solid'
                }
                title="이메일"
                value={email}
                onChange={handleChange}
                placeholder="예) lego@lego.co.kr"
              />
            </label>
            {inputsPass.emailPass || email.length == 0 ? (
              ''
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
                type="text"
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
              />
            </label>
            {inputsPass.pwPass || pw.length == 0 ? (
              ''
            ) : (
              <span className="text-red-500 self-start ml-4">
                8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.
              </span>
            )}
            <label>
              비밀번호확인
              <FontAwesomeAsterisk />
              <br />
              <input
                type="text"
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

          :hover {
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
