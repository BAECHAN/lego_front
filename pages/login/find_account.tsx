import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'
import ButtonFindAccountToggle from '@components/login/ButtonFindAccountToggle'
import FontAwesomeAngleRight from '@components/FontAwesomeAngleRight'

export default function FindAccount() {
  const [isSubmit, setIsSubmit] = useState(false)
  const [isFind, setIsFind] = useState(false)

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

    /** DB에 아이디 있는지 확인 후 return하는 api */
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/email-chk?email=${email}`)
      .then((response) => {
        setIsSubmit(true)

        response.data.result > 0 ? setIsFind(true) : setIsFind(false)
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
            <p className="text-2xl">사용자 아이디(이메일)를 잊으셨나요?</p>
            <br />
            <p>
              회원정보가 한정적이라 아이디를 검색하여 <br /> 아이디가 존재하는지
              확인해주시기 바랍니다.
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
                <div className=" text-green-600 mb-3">
                  회원가입 된 아이디입니다. <br />
                  해당 계정으로 로그인해주시기 바랍니다.
                </div>
                <Link href="/login">
                  <a className="hover:underline hover:text-blue-600">
                    로그인 하러가기
                    <FontAwesomeAngleRight />
                  </a>
                </Link>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-red-600 mb-3">
                  회원가입 되지 않은 아이디입니다.
                  <br />
                  계정이 없으시다면 해당 아이디로 회원가입 해주시기 바랍니다.
                </div>
                <Link href="/login/create_account">
                  <a className="hover:underline hover:text-blue-600">
                    회원가입 하러가기
                    <FontAwesomeAngleRight />
                  </a>
                </Link>
              </div>
            )
          ) : null}

          <button type="submit" className="login-btn-credential">
            검색
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
