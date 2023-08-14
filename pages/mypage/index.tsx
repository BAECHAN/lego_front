import React from 'react'

import Layout from '@components/Layout'

export default function MyPage() {
  return <div></div>
}

MyPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
