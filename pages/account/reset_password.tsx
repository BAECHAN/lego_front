import Layout from '@components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import FontAwesomeAsterisk from '@components/FontAwesomeAsterisk'

import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react'
import Router, { useRouter } from 'next/router'
import crypto from 'crypto-js'
import axiosRequest from 'pages/api/axios'
import {
  EventTargetT,
  InputRefsT,
  InputTNotPwchk,
  ObjT_Bln,
  UserPasswordSubmitT,
} from 'types'
import { isPassRegExpInput } from '@components/common/event/CommonFunction'

export default function ResetPassword() {
  const router = useRouter()

  const token = router.query.token as string

  const [isExpired, setIsExpired] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const [inputs, setInputs] = useState<UserPasswordSubmitT>({
    pw: '',
    pwChk: '',
  })

  const inputRefs: InputRefsT = {
    pw: useRef<HTMLInputElement>(null),
    pwChk: useRef<HTMLInputElement>(null),
  }

  let { pw, pwChk } = inputs

  const [disabledSubmit, setDisabledSubmit] = useState<boolean>(false)

  const [isPassRegExp, setIsPassRegExp] = useState<ObjT_Bln>({
    pw: false,
  })

  const [isMatchPw, setIsMatchPw] = useState<boolean>(false)

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value }: EventTargetT = e.target

    setInputs({
      ...inputs,
      [name]: value,
    })

    if (value) {
      if (name === 'pw') {
        setIsPassRegExp({
          ...isPassRegExp,
          [name]: isPassRegExpInput(name as InputTNotPwchk, value),
        })

        pwChk === value ? setIsMatchPw(true) : setIsMatchPw(false)
      } else {
        pw === value ? setIsMatchPw(true) : setIsMatchPw(false)
      }
    } else {
      if (name === 'pw') {
        setIsPassRegExp({
          ...isPassRegExp,
          [name]: false,
        })
      }
      setIsMatchPw(false)
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

    if (isPassRegExp.pw && pw === pwChk) {
      const secretKey = process.env.NEXT_PUBLIC_CRYPT_KEY
      let hashedPassword: string = ''

      if (secretKey) {
        hashedPassword = crypto.HmacSHA512(pw, secretKey).toString()
      } else {
        throw new Error(`secretKey is undefined`)
      }

      const userInfo = {
        pw: hashedPassword,
        token: token,
      }

      axiosRequest(
        'patch',
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/update-password`,
        userInfo
      )
        .then((response) => {
          if (response?.status === 204) {
            if (router.query.callbackPage == 'user_info') {
              alert(
                '비밀번호가 변경되었습니다.\r회원 정보 페이지로 이동합니다.'
              )
              router.push('/mypage/user_info')
            } else {
              alert('비밀번호가 변경되었습니다.\r로그인 페이지로 이동합니다.')
              Router.push('/login')
            }
          } else {
            alert(
              '의도하지 않은 응답입니다.\r고객센터에 문의해주시기 바랍니다.'
            )
            console.error(`HTTP status : ${response?.status}`)
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

  useEffect(() => {
    if (router.isReady) {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/token-chk`

      axiosRequest('post', url, { token: token })
        .then((response) => {
          if (response?.data.result.expired) {
            setIsExpired(true)
          } else {
            setIsExpired(false)
          }
          setIsLoading(false)
        })
        .catch((error) => {
          console.log(error)
          alert('잘못된 접근입니다.')
          router.push('/')
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, token])

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
                  <span>비밀번호</span>
                  <FontAwesomeAsterisk />
                  <br />
                  <input
                    type="password"
                    id="pw"
                    name="pw"
                    title="새 비밀번호 입력란"
                    className={`${
                      !pw
                        ? 'border-gray'
                        : !isPassRegExp.pw
                        ? 'border-red'
                        : 'border-green'
                    }`}
                    value={pw}
                    onChange={(event) => handleChangeInput(event)}
                    ref={inputRefs.pw}
                    placeholder="8~16자 영문 대 소문자, 숫자, 특수문자"
                    autoComplete="off"
                  />
                </label>
                {pw ? (
                  !isPassRegExp.pw ? (
                    <span className="text-red-500">
                      8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.
                    </span>
                  ) : null
                ) : null}

                <label>
                  <span>비밀번호확인</span>
                  <FontAwesomeAsterisk />
                  <br />
                  <input
                    type="password"
                    id="pwChk"
                    name="pwChk"
                    title="새 비밀번호 확인 입력란"
                    className={`${
                      !pwChk
                        ? 'border-gray'
                        : pw !== pwChk
                        ? 'border-red'
                        : 'border-green'
                    }`}
                    value={pwChk}
                    onChange={(event) => handleChangeInput(event)}
                    ref={inputRefs.pwChk}
                    placeholder="8~16자 영문 대 소문자, 숫자, 특수문자"
                    autoComplete="off"
                  />
                </label>
                {pwChk ? (
                  !isMatchPw ? (
                    <span className="text-red-500">
                      비밀번호가 일치하지 않습니다.
                    </span>
                  ) : null
                ) : null}

                <button
                  type="submit"
                  className="btn-common min-w-[330px] h-33 fs-14"
                  disabled={disabledSubmit}
                  title="비밀번호 변경하기 버튼"
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
                  <a
                    title="비밀번호 찾기 페이지로 이동"
                    className="go-find-password "
                  >
                    비밀번호 찾기
                  </a>
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
