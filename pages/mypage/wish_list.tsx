import Layout from '@components/Layout'
import React from 'react'

export default function WishList() {
  return <div>에고</div>
}
WishList.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
