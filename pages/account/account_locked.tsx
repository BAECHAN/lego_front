import Layout from '@components/Layout'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from 'styles/account.module.scss'
import Link from 'next/link'

export default function AccountExpiredAccount() {
  const router = useRouter()

  const session = useSession()

  useEffect(() => {
    signOut({ redirect: false })
  }, [session])

  return (
    <div className="min-h-[80vh] bg-gray-200">
      <div className={`flex justify-center items-center ${styles['account-contents']}`}>
        <h2 className="text-3xl ">잠금 계정 안내</h2>
        <p className="text-center">
          해당 계정은 이용약관에 위배되는 활동이 의심되어 잠긴 계정으로 전환되었습니다. <br />
          잠김을 해제하려면 고객센터에 문의해주시기 바랍니다.
          <br />
        </p>
        <p>
          ( <FontAwesomeIcon icon={faPhone} width={'10px'} className="inline" />
          &nbsp;1234-5678 )
        </p>

        <Link href="/" passHref>
          <a className="btn-common min-w-[330px]" title="홈페이지로 이동">
            홈페이지로 이동
          </a>
        </Link>
      </div>
    </div>
  )
}

AccountExpiredAccount.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
