import Layout from '@components/Layout'
import React from 'react'

export default function UserInfo() {
  return <div>회원 정보</div>
}
UserInfo.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
