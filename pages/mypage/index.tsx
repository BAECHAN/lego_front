import Layout from '@components/Layout'
import React from 'react'

export default function MyPage() {
  return <div>마이페이지</div>
}

MyPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
