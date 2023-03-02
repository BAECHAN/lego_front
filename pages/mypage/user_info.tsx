import Layout from '@components/Layout'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

export default function UserInfo() {
  const { data: session } = useSession()

  useEffect(() => {
    console.log(session)
  }, [session])

  // 회원정보 가져와서 화면에 보여주기
  // 수정할 수 있도록 하는 버튼 추가
  // 로그인 연동 ()

  return (
    <div>
      <style jsx>{``}</style>
    </div>
  )
}
UserInfo.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
