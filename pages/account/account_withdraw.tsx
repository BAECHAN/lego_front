import Layout from '@components/Layout'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function AccountExpiredAccount() {
  const router = useRouter()
  const session = useSession()

  useEffect(() => {
    signOut({ redirect: false })
  }, [session])

  const handleClickButton = () => {
    router.push('/login/create_account')
  }

  return (
    <div className="min-h-[80vh] bg-gray-200">
      <div className="flex justify-center items-center account-contents">
        <h2 className="text-3xl ">탈퇴 계정 안내</h2>
        <p className="text-center">
          해당 계정은 탈퇴처리된 계정입니다.
          <br />
          서비스를 다시 이용하시고 싶으신 경우, 회원가입을 진행하시어 새로운
          계정을 생성해주시기 바랍니다.
          <br />
        </p>
        <button
          type="button"
          className="btn-common min-w-[330px]"
          title="회원가입 하러가기"
          onClick={handleClickButton}
        >
          회원가입 하러가기
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
        }
      `}</style>
    </div>
  )
}

AccountExpiredAccount.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
