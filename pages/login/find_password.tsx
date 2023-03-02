import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'
import ButtonFindAccountToggle from '@components/login/ButtonFindAccountToggle'
import FontAwesomeAngleRight from '@components/FontAwesomeAngleRight'

export default function FindPassword() {
  const [isSubmit, setIsSubmit] = useState(false)
  const [isFind, setIsFind] = useState(false)
  const [email, setEmail] = useState('')

  const findId = async (e: any) => {
    // 원래 실행되는 이벤트 취소
    e.preventDefault()
    // Form 안에서 이메일, 패스워드 가져오기
    let email = e.target.email.value

    if (!email) {
      alert('이메일 주소를 입력해주세요.')
      document.getElementById('email')?.focus()
      return false
    }

    setEmail(email)

    axios
      .get('http://localhost:5000/api/email-chk?email=' + email)
      .then((response) => {
        setIsSubmit(true)

        response.data.result > 0 ? setIsFind(true) : setIsFind(false)

        axios
          .post('/api/nodemailer', {
            method: 'POST',
            param: JSON.stringify({ email }),
            headers: { 'Content-Type': `application/json; charset=utf-8` },
          })
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="h-full bg-gray-200">
      <div className="flex justify-center items-center">
        <form onSubmit={findId} className="login-box">
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
          <h1 className="text-3xl">Account</h1>

          <ButtonFindAccountToggle />

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

          <label>
            아이디(이메일) 입력
            <br />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="예) lego@lego.co.kr"
              autoComplete="off"
            />
          </label>

          {isSubmit ? (
            isFind ? (
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
                    <a className="hover:underline hover:text-blue-600">
                      회원가입 하러가기
                      <FontAwesomeAngleRight />
                    </a>
                  </Link>
                  <Link href="/login/find_account">
                    <a className="hover:underline hover:text-blue-600">
                      아이디(이메일)찾기
                      <FontAwesomeAngleRight />
                    </a>
                  </Link>
                  <div />
                </div>
              </div>
            )
          ) : null}

          <button type="submit" className="login-btn-credential">
            비밀번호 찾기
          </button>
        </form>
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

            :hover {
              background-color: black;
              color: white;
            }
          }
        }
      `}</style>
    </div>
  )
}
