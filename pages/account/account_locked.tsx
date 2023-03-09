import Layout from '@components/Layout'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function AccountExpiredAccount() {
  const router = useRouter()

  const session = useSession()

  useEffect(() => {
    signOut({ redirect: false })
  }, [session])

  const handleClickButton = () => {
    router.push('/')
  }

  return (
    <div className="min-h-[80vh] bg-gray-200">
      <div className="flex justify-center items-center account-contents">
        <h2 className="text-3xl ">잠금 계정 안내</h2>
        <p className="text-center">
          해당 계정은 이용약관에 위배되는 활동이 의심되어 잠긴 계정으로
          전환되었습니다. <br />
          잠김을 해제하려면 관리자에게 문의해주시기 바랍니다.
          <br />
        </p>
        <p>
          ( <FontAwesomeIcon icon={faPhone} width={'10px'} className="inline" />
          &nbsp;1234-5678 )
        </p>

        <button type="button" onClick={handleClickButton}>
          홈페이지로 이동
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
