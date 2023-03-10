import Layout from '@components/Layout'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import axiosRequest from 'pages/api/axios'

export default function AccountExpiredAccount() {
  const router = useRouter()
  const session = useSession()

  const handleClickButton = () => {
    if (session.data?.user?.email) {
      let param = {
        email: session.data?.user?.email,
      }

      axiosRequest('patch', `http://localhost:5000/api/wakeup-account`, param)
        .then(async (response) => {
          if (response?.status === 200 && response.data.result == 1) {
            console.log(session)
            //session?.data?.user?.state = 1;
            alert('휴면을 해제하였습니다.\r다시 로그인 해주시기 바랍니다.')
            await signOut()
          } else {
            new Error()
          }
        })
        .catch((error) => {
          console.log(error)
          alert(
            '휴면을 해제하는데 실패하였습니다.\r고객센터에 문의해주시기 바랍니다.'
          )
          return false
        })
    } else {
      signIn()
    }
  }

  return (
    <div className="min-h-[80vh] bg-gray-200">
      <div className="flex justify-center items-center account-contents">
        <h2 className="text-3xl ">휴면 계정 안내</h2>
        <p className="text-center">
          해당 계정은 개인정보 보호를 위하여 마지막 로그인 기준 1년 미접속하여
          휴면 계정으로 전환되었습니다. <br />
          휴면을 해제하려면 아래 버튼을 클릭해주시기 바랍니다.
        </p>
        <button type="button" onClick={handleClickButton}>
          휴면 해제
        </button>
      </div>
      <style jsx>{`
        .account-contents {
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

AccountExpiredAccount.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
