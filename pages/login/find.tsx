import Link from 'next/link'
import Image from 'next/image'
import { useState, FormEvent, useRef, useEffect } from 'react'
import ButtonFindAccountToggle from '@components/login/ButtonFindAccountToggle'
import FontAwesomeAngleRight from '@components/FontAwesomeAngleRight'
import { checkOverlapInput } from '@components/common/event/CommonFunction'
import axios from 'axios'
import { findAccountSelector } from 'state/atoms'
import { useRecoilValue } from 'recoil'
import Spinner from '@components/Spinner'
import Portal from '@components/Portal'
import InputEmail from '@components/common/input/InputEmail'

export default function Find() {
  const findAccountType = useRecoilValue(findAccountSelector)

  const [isSubmit, setIsSubmit] = useState(false)
  const [isFind, setIsFind] = useState(false)
  const [email, setEmail] = useState('')
  const emailRef = useRef<HTMLInputElement>(null)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsSubmit(false)
    setIsFind(false)
  }, [findAccountType])

  const findId = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email) {
      alert('이메일 주소를 입력해주세요.')
      emailRef?.current?.focus()
      return false
    } else {
      setIsLoading(true)

      checkOverlapInput('email', email).then(async (response: boolean) => {
        setIsFind(response)

        if (findAccountType === 'password') {
          await axios
            .post('/api/nodemailer', {
              method: 'POST',
              param: JSON.stringify({ email }),
              headers: { 'Content-Type': `application/json; charset=utf-8` },
            })
            .then((response) => {
              if (response.status === 200) {
                setIsSubmit(true)
              } else {
                console.error(`HTTP status : ${response?.status}`)
              }
            })
            .catch((error) => {
              console.error(error)
            })
        } else {
          setIsSubmit(true)
        }
        setIsLoading(false)
      })
    }
  }

  return (
    <div className="h-full bg-gray-200">
      <div className="flex justify-center items-center">
        {isLoading && (
          <Portal selector="#portal">
            <Spinner />
          </Portal>
        )}
        <form onSubmit={findId} className="find-box">
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

          <ButtonFindAccountToggle isLoading={isLoading} />

          {findAccountType === 'email' ? (
            <div className="flex flex-col text-center">
              <p className="text-2xl">사용자 아이디(이메일)를 잊으셨나요?</p>
              <br />
              <p>
                회원정보가 한정적이라 아이디를 검색하여
                <br />
                아이디가 존재하는지 확인해주시기 바랍니다.
              </p>
            </div>
          ) : (
            <div className="flex flex-col text-center">
              <p className="text-2xl">사용자 비밀번호를 잊으셨나요?</p>
              <br />
              <p>
                비밀번호의 경우 암호화 저장되어 분실 시 찾아드릴 수 없는 정보
                입니다.
                <br />
                본인 확인을 통해 비밀번호를 재설정 하실 수 있습니다.
              </p>
            </div>
          )}

          <InputEmail email={email} setEmail={setEmail} ref={emailRef} />

          {isSubmit ? (
            isFind ? (
              findAccountType === 'email' ? (
                <div className="text-center">
                  <div className=" text-green-600 mb-3">
                    회원가입 된 아이디입니다. <br />
                    해당 계정으로 로그인해주시기 바랍니다.
                  </div>
                  <Link href="/login">
                    <a
                      title="로그인 페이지로 이동"
                      className="hover:underline hover:text-blue-600"
                    >
                      로그인 하러가기
                      <FontAwesomeAngleRight />
                    </a>
                  </Link>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-green-600 mb-3">
                    <span className="text-blue-600">{email}</span>으로 비밀번호
                    재설정 이메일을 발송하였습니다. <br />
                    <br />
                    <p className="text-sm">
                      이메일을 받지 못하셨다면 스팸메일함을 확인해보시거나
                      고객센터로 문의해주시기 바랍니다.
                    </p>
                  </div>
                </div>
              )
            ) : findAccountType === 'email' ? (
              <div className="text-center">
                <div className="text-red-600 mb-3">
                  회원가입 되지 않은 아이디입니다.
                  <br />
                  계정이 없으시다면 해당 아이디로 회원가입 해주시기 바랍니다.
                </div>
                <Link href="/login/create_account">
                  <a
                    title="회원가입 페이지로 이동"
                    className="hover:underline hover:text-blue-600"
                  >
                    회원가입 하러가기
                    <FontAwesomeAngleRight />
                  </a>
                </Link>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-red-600 mb-3">
                  아이디(이메일)에 해당하는 계정이 없습니다.
                  <br />
                  <br />
                  <p className="text-sm">
                    계정이 없으시다면 회원가입을 진행해주시기를 바랍니다.
                    <br />
                    혹여나 아이디(이메일)을 잊으신 경우, 먼저 아이디(이메일)
                    찾기를 진행해주시기를 바랍니다.
                  </p>
                </div>
                <div className="flex justify-around">
                  <div />
                  <Link href="/login/create_account">
                    <a
                      title="회원가입 페이지로 이동"
                      className="hover:underline hover:text-blue-600"
                    >
                      회원가입 하러가기
                      <FontAwesomeAngleRight />
                    </a>
                  </Link>
                  <Link href="/login/find_account">
                    <a
                      title="이메일 찾기 페이지로 이동"
                      className="hover:underline hover:text-blue-600"
                    >
                      아이디(이메일)찾기
                      <FontAwesomeAngleRight />
                    </a>
                  </Link>
                  <div />
                </div>
              </div>
            )
          ) : null}

          <button
            type="submit"
            title={
              findAccountType === 'email'
                ? '아이디 존재 유무 확인 버튼'
                : '새 비밀번호를 발급받기 위한 인증번호를 이메일로 전송하기'
            }
            className="btn-common h-33 fs-14 desktop:min-w-[500px] mobile:w-full"
          >
            {findAccountType === 'email' ? '검색' : '비밀번호 찾기'}
          </button>
        </form>
      </div>
      <style jsx>{`
        .find-box {
          min-width: 800px;
          vertical-align: middle;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;

          > * {
            margin: 8px 0px;
          }

          @media (max-width: 768px) {
            min-width: 50%;
          }
        }
      `}</style>
    </div>
  )
}
