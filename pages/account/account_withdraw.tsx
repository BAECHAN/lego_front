import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect } from 'react'

import Layout from '@components/Layout'

import styles from 'styles/account.module.scss'

export default function AccountExpiredAccount() {
  const session = useSession()

  useEffect(() => {
    signOut({ redirect: false })
  }, [session])

  return (
    <div className="min-h-[80vh] bg-gray-200">
      <div className={`flex justify-center items-center ${styles['account-contents']}`}>
        <h2 className="text-3xl ">탈퇴 계정 안내</h2>
        <p className="text-center">
          해당 계정은 탈퇴처리된 계정입니다.
          <br />
          서비스를 다시 이용하시고 싶으신 경우, 회원가입을 진행하시어 새로운 계정을 생성해주시기 바랍니다.
          <br />
        </p>
        <Link href="/login/create_account" passHref>
          <a className="btn-common min-w-[330px]" title="회원가입 하러가기">
            회원가입 하러가기
          </a>
        </Link>
      </div>
    </div>
  )
}

AccountExpiredAccount.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
