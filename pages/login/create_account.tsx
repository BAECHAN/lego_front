import Layout from '@components/Layout'
import Link from 'next/link'
import FontAwesomeAsterisk from '@components/FontAwesomeAsterisk'
import * as swal from '@components/common/custom/SweetAlert'

import React, { ChangeEvent, useState, FocusEvent, FormEvent, useRef } from 'react'
import { EventTargetT, InputRefsT, InputTNotPwchk, ObjT_Bln, UserCreateT } from 'types'
import crypto from 'crypto-js'
import axiosRequest from 'pages/api/axios'
import { useRouter } from 'next/router'

import { checkOverlapInput, isPassRegExpInput } from '@components/common/event/CommonFunction'
import HomeIconLink from '@components/HomeIconLink'

export default function CreateAccount() {
  const router = useRouter()

  const [inputs, setInputs] = useState<UserCreateT>({
    email: '',
    pw: '',
    pwChk: '',
    nickname: '',
  })

  const inputRefs: InputRefsT = {
    email: useRef<HTMLInputElement>(null),
    pw: useRef<HTMLInputElement>(null),
    pwChk: useRef<HTMLInputElement>(null),
    nickname: useRef<HTMLInputElement>(null),
  }

  let { email, pw, pwChk, nickname } = inputs

  const [disabledSubmit, setDisabledSubmit] = useState<boolean>(false)

  const [isOverlap, setIsOverlap] = useState<ObjT_Bln>({
    email: false,
    nickname: false,
  })

  const [isPassRegExp, setIsPassRegExp] = useState<ObjT_Bln>({
    email: false,
    pw: false,
    nickname: false,
  })

  const [isMatchPw, setIsMatchPw] = useState<boolean>(false)

  const handleBlurInput = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value }: EventTargetT = e.target

    if (typeof name === 'string' && value) {
      checkOverlapInput(name as InputTNotPwchk, value).then((response: boolean) => {
        setIsOverlap({
          ...isOverlap,
          [name]: response,
        })
      })
    } else {
      setIsOverlap({
        ...isOverlap,
        [name]: true,
      })
    }
  }

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value }: EventTargetT = e.target

    setInputs({
      ...inputs,
      [name]: value,
    })

    if (value) {
      if (['email', 'pw', 'nickname'].includes(name)) {
        setIsPassRegExp({
          ...isPassRegExp,
          [name]: isPassRegExpInput(name as InputTNotPwchk, value),
        })

        if (name === 'pw') {
          pwChk === value ? setIsMatchPw(true) : setIsMatchPw(false)
        } else {
          isOverlap &&
            setIsOverlap({
              ...isOverlap,
              [name]: false,
            })
        }
      } else {
        pw === value ? setIsMatchPw(true) : setIsMatchPw(false)
      }
    } else {
      if (['email', 'pw', 'nickname'].includes(name)) {
        setIsPassRegExp({
          ...isPassRegExp,
          [name]: false,
        })
      } else {
        setIsMatchPw(false)
      }
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault() // reload 방지

    Object.entries(inputs).some(([key, value]: string[]) => {
      if (value.length === 0) {
        alert(`${inputRefs[key]?.current?.title}을 확인해주시기 바랍니다.`)
        inputRefs[key]?.current?.focus()
        return true
      }
    })

    if (!isOverlap.email && !isOverlap.nickname && isPassRegExp.email && isPassRegExp.pw && isPassRegExp.nickname && pw === pwChk) {
      const secretKey = process.env.NEXT_PUBLIC_CRYPT_KEY
      let hashedPassword: string = ''

      if (secretKey) {
        hashedPassword = crypto.HmacSHA512(pw, secretKey).toString()
      } else {
        throw new Error(`secretKey is undefined`)
      }

      const userInfo = {
        email,
        pw: hashedPassword,
        nickname,
      }

      axiosRequest('post', `${process.env.NEXT_PUBLIC_SERVER_URL}/api/create-account`, userInfo)
        .then((response) => {
          if (response?.status === 201) {
            swal.SweetAlertSuccess('회원가입되었습니다.', '로그인 페이지로 이동합니다.')
            setDisabledSubmit(true)
            router.push('/login')
          } else {
            throw new Error(`HTTP status : ${response?.status}`)
          }
        })
        .catch((error) => {
          console.error(error)
          setDisabledSubmit(true)
          alert('회원가입이 실패하였습니다.\r고객센터에 문의해주시기 바랍니다.')
          return false
        })
    }
  }

  return (
    <div>
      <div className="flex justify-center items-center w-full bg-gray-200 h-[38rem]">
        <div className="h-full relative top-[10%]">
          <form name="loginForm" className="login-box" onSubmit={handleSubmit}>
            <HomeIconLink />
            <label>
              <div className="flex">
                <span>이메일 주소</span>
                <span>
                  <FontAwesomeAsterisk />
                </span>
                <div className="flex-grow"></div>
                <i className="text-[8px] leading-6 text-gray-600">사용하고 계시는 이메일을 입력해주세요.</i>
              </div>
              <input
                type="text"
                id="email"
                name="email"
                title="이메일 주소 입력란"
                className={`${!email ? 'border-gray' : isOverlap.email || !isPassRegExp.email ? 'border-red' : 'border-green'}`}
                value={email}
                onChange={handleChangeInput}
                onBlur={handleBlurInput}
                ref={inputRefs.email}
                placeholder="예) lego@lego.co.kr"
                autoComplete="off"
              />
            </label>
            {email ? (
              !isPassRegExp.email ? (
                <span className="text-red-500">이메일 양식이 맞지 않습니다.</span>
              ) : isOverlap.email ? (
                <div>
                  <span className="text-red-500 ml-4">이미 가입된 이메일입니다.</span>
                  <div className="ml-10">
                    <Link href="/login" passHref>
                      <a className="text-sm hover:underline hover:text-blue-600">로그인</a>
                    </Link>
                    <span className="mx-5">|</span>
                    <Link href="/find_password" passHref>
                      <a className="text-sm hover:underline hover:text-blue-600">비밀번호찾기</a>
                    </Link>
                  </div>
                </div>
              ) : null
            ) : null}

            <label>
              <span>비밀번호</span>
              <FontAwesomeAsterisk />
              <br />
              <input
                type="password"
                id="pw"
                name="pw"
                title="비밀번호 입력란"
                className={`${!pw ? 'border-gray' : !isPassRegExp.pw ? 'border-red' : 'border-green'}`}
                value={pw}
                onChange={(event) => handleChangeInput(event)}
                ref={inputRefs.pw}
                placeholder="8~16자 영문 대 소문자, 숫자, 특수문자"
                autoComplete="off"
              />
            </label>
            {pw ? !isPassRegExp.pw ? <span className="text-red-500">8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.</span> : null : null}

            <label>
              <span>비밀번호확인</span>
              <FontAwesomeAsterisk />
              <br />
              <input
                type="password"
                id="pwChk"
                name="pwChk"
                title="비밀번호 확인 입력란"
                className={`${!pwChk ? 'border-gray' : pw !== pwChk ? 'border-red' : 'border-green'}`}
                value={pwChk}
                onChange={(event) => handleChangeInput(event)}
                ref={inputRefs.pwChk}
                placeholder="8~16자 영문 대 소문자, 숫자, 특수문자"
                autoComplete="off"
              />
            </label>
            {pwChk && !isMatchPw && <span className="text-red-500">비밀번호가 일치하지 않습니다.</span>}

            <label>
              <span>닉네임</span>
              <FontAwesomeAsterisk />
              <br />
              <input
                type="text"
                id="nickname"
                name="nickname"
                title="닉네임 입력란"
                className={`${!nickname ? 'border-gray' : isOverlap.nickname || !isPassRegExp.nickname ? 'border-red' : 'border-green'}`}
                value={nickname}
                onChange={(event) => handleChangeInput(event)}
                onBlur={(event) => {
                  handleBlurInput(event)
                }}
                ref={inputRefs.nickname}
                placeholder="2글자 이상 16글자 이하의 한글 또는 영문"
                autoComplete="off"
              />
            </label>
            {nickname ? (
              !isPassRegExp.nickname ? (
                <span className="text-red-500">닉네임 양식이 맞지 않습니다.</span>
              ) : isOverlap.nickname ? (
                <span className="text-red-500">사용중인 닉네임입니다.</span>
              ) : null
            ) : null}
            <button type="submit" title="회원가입 신청 버튼" className="btn-common min-w-[330px] h-33 fs-14" disabled={disabledSubmit}>
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

            &.border-gray {
              border: 2px gray solid;
            }

            &.border-red {
              border: 2px red solid;
            }

            &.border-green {
              border: 2px green solid;
            }
          }
        }
      `}</style>
    </div>
  )
}
CreateAccount.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
