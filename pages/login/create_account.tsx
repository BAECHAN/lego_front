import Layout from '@components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import FontAwesomeAsterisk from '@components/FontAwesomeAsterisk'
import React, { FocusEvent, useState } from 'react'

import { inputRegExpT } from 'types'

export default function CreateAccount() {
  const [inputs, setInputs] = useState({
    email: '',
    pw: '',
    pwChk: '',
    nickname: '',
  })

  const { email, pw, pwChk, nickname } = inputs
  const inputRegExp: inputRegExpT = {
    email:
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    pw: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
    pwChk: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
    nickname: /^(?=.*[a-z0-9A-Z가-힣])[a-z0-9A-Z가-힣]{2,16}$/,
  }

  const handleChange = (e: FocusEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setInputs({
      ...inputs,
      [name]: value.trim(),
    })
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { value, name, style } = e.target

    if (value.trim().length > 0) {
      const regExp = inputRegExp[name]

      if (regExp.test(value)) {
        style.border = 'solid green 2px'

        name == 'pwChk' && pw != pwChk ? (style.border = 'solid red 2px') : ''
        name == 'pw' && pwChk.length > 0 && pw != pwChk
          ? (document.getElementsByName('pwChk')[0].style.border =
              'solid red 2px')
          : ''
      } else {
        style.border = 'solid red 2px'
      }
    } else {
      style.border = 'solid blue 2px'
    }
  }

  return (
    <div>
      <div className="flex justify-center items-center w-full bg-gray-200 h-[38rem]">
        <div className="h-full relative top-[10%]">
          <form name="loginForm" className="login-box">
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
                title="이메일"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="예) lego@lego.co.kr"
                // style = {{border : true ? "solid green 2px" : "solid red 2px"}}
              />
            </label>
            <label>
              비밀번호
              <FontAwesomeAsterisk />
              <br />
              <input
                type="text"
                name="pw"
                title="비밀번호"
                value={pw}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </label>
            <label>
              비밀번호확인
              <FontAwesomeAsterisk />
              <br />
              <input
                type="text"
                name="pwChk"
                title="비밀번호확인"
                value={pwChk}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </label>
            <label>
              닉네임
              <FontAwesomeAsterisk />
              <br />
              <input
                type="text"
                name="nickname"
                title="별명"
                value={nickname}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </label>
            <button>회원가입</button>
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

          > * {
            margin: 8px 0px;
          }

          input {
            width: 330px;
            height: 35px;
            border: solid gray 1px;
            display: inline-block;
            padding: 5px;
          }
          button {
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
          }
          button:hover {
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
