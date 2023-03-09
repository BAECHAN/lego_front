import Layout from '@components/Layout'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function AccountExpiredNotice() {
  const router = useRouter()

  useEffect(() => {
    signOut({ redirect: false })
  }, [])

  const handleClickButton = () => {
    router.push('/login/create_account')
  }

  return (
    <div className="min-h-[80vh] bg-gray-200">
      <div className="flex justify-center items-center notice-contents">
        <h2 className="text-3xl ">탈퇴 계정 안내</h2>
        <p className="text-center">
          해당 계정은 탈퇴처리된 계정입니다.
          <br />
          서비스를 다시 이용하시고 싶으신 경우, 회원가입을 진행하시어 새로운
          계정을 생성해주시기 바랍니다.
          <br />
        </p>
        <button type="button" onClick={handleClickButton}>
          회원가입 하러가기
        </button>
      </div>
      <style jsx>{`
        .notice-contents {
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

          button {
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
        }
      `}</style>
    </div>
  )
}

AccountExpiredNotice.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
